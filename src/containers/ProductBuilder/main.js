import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProductSchema } from 'libs/validation';
import * as productActions from 'actions/product';
import * as flashMessages from 'actions/flashMessage';
import * as filesActions from 'actions/files';
import { ProductBuilderSkelton } from 'components/Loaders';
import hardCodedMessages from 'assets/hardCodedMessages.json';
import defaultLanguage from 'data/defaultLanguage.json';
import { formatLanguage } from 'libs';
import {
  stopTabClosing, htmlToImage, slugify, getTextContentFromTextNode
} from 'libs';
import { SideBar, Header, ProductEditableTemplate } from './components';
import './style.css';


const getLanguageLabel = (
  languages = [],
  {
    language: langId
  } = {}
) => {
  let language = languages.find((lang) => lang._id === langId);
  if (!language) language = defaultLanguage;

  return { ...formatLanguage(language), type: language.type };
};


const ProductBuilder = ({
  products,
  subdomain,
  globelLoading,
  translations: languages,
  ...props
}) => {
  const [fields, setFields] = useState({});
  const [displayType, setDisplayType] = useState('desktop');
  // const [changesDetected, setChangesDetected] = useState(false)
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({ product: true });
  const [templateChanging, setTemplateChanging] = useState(false);
  const [isSidebarOpened, setSidebarOpened] = useState(false);
  const [enableDarkTheme, setEnableDarkTheme] = useState(false);


  const [unblock, SetUnblock] = useState();


  const changesDetected = () => {
    const unblock = props.history.block('Changes you made may not be saved.');
    SetUnblock(unblock);
    stopTabClosing(true);
  };

  const changesSaved = () => {
    typeof unblock === 'function' && unblock();
    stopTabClosing(false);
  };

  const onChange = ({ target: { name, value } }) => {
    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...fields[key], ...nestedValue };
    }


    // console.log('Changes registered', name, value);
    setFields({ ...fields, [name]: value });
    setErrors({ ...errors, [name]: '' });
    changesDetected();
  };

  const onToggleDarkTheme = () => {
    setEnableDarkTheme(!enableDarkTheme);
  };

  useEffect(() => {
    const { id } = props.match.params;
    const product = products.find(({ _id }) => _id === id) || {};
    if (product._id !== fields._id) setFields(product);

    if (product._id) setLoading({ product: false });


    return () => {
      // setFields({});
    };
  }, [products, globelLoading]);

  const onDisplayChange = (type) => {
    setDisplayType(type);
  };

  const updateUrlOnChange = (currentId) => {
    const { id } = props.match.params;
    if (currentId !== id) props.history.push(id);
  };

  const onSave = async () => {
    const {
      isValid,
      errors,
      value: product
    } = await ProductSchema(fields);

    if (!isValid) {
      props.showFlashMessage({
        type: 'failed',
        message: `Check the products Fields And Try a gain\n${errors}`
      });
      return setErrors(errors);
    }
    const thumbnail = await htmlToImage(fields._id);
    // thumbnail.filename = fields.name;
    if (thumbnail) {
      props.uploadFile({
        file: thumbnail,
        fileName: slugify(fields.name),
        type: 'products',
        source: 'product.thumbnail'
      }, {
        onSuccess: (data) => {
          product.thumbnail = data;
          props.updateProduct(
            {
              productId: fields._id,
              details: product
            },
            {
              onSuccess: (msg) => {
                props.showFlashMessage({
                  type: 'success',
                  message: 'Your Changes Saved Successfully'
                });
                changesSaved();
                updateUrlOnChange(fields._id);
              },
              onFailed: (message) => {
                props.showFlashMessage({
                  type: 'failed',
                  message: `Check the Fields And Try a gain\n${errors}`
                });
              }
            }
          );
        },
        // onFailed: reject
      });
    } else {
      props.updateProduct(
        {
          productId: fields._id,
          details: product
        },
        {
          onSuccess: (msg) => {
            props.showFlashMessage({
              type: 'success',
              message: 'Your Changes Saved Successfully'
            });
            changesSaved();
            updateUrlOnChange(fields._id);
          },
          onFailed: (message) => {
            props.showFlashMessage({
              type: 'failed',
              message: `Check the Fields And Try a gain\n${errors}`
            });
          }
        }
      );
    }
  };
  const postSideChanging = (state) => {
    setSidebarOpened(state);
  };
  const toggleTemplateChangeEffect = () => {
    setTemplateChanging(!templateChanging);
    setTimeout(() => {
      setTemplateChanging((state) => !state);
    }, 350);
  };

  const onTemplateChange = (template) => () => {
    const { pagePreferences: { template: currentTemplate, ...pagePreferences } = {} } = fields;
    const updatesObj = {};

    if (
      (currentTemplate !== template)
      && currentTemplate === 'temp6'
    ) {
      const featuresTitle = 'Features Title';
      // getTextContentFromTextNode(
      //   pagePreferences.features
      //   && pagePreferences.features.title
      // );
      const description = getTextContentFromTextNode(
        pagePreferences.description
      );

      updatesObj.pagePreferences = {
        ...pagePreferences,
        features: {
          ...pagePreferences.features,
          title: featuresTitle
        },
        description,
        template
      };
    } else if (
      (currentTemplate !== template)
      && template === 'temp6'
    ) {
      const {
        products: {
          defaults: {
            temp6: {
              features: featuresTitle
            }
          }
        }
      } = hardCodedMessages;

      updatesObj.pagePreferences = {
        ...pagePreferences,
        description: pagePreferences.description,
        features: {
          ...pagePreferences.features,
          title: featuresTitle
        },
        template
      };
    } else {
      updatesObj.pagePreferences = {
        ...pagePreferences,
        description: pagePreferences.description,
        template
      };
    }

    setFields({ ...fields, ...updatesObj });
  };


  const activeLanguage = getLanguageLabel(languages, fields.settings);

  const workSpaceStyles = {
    backgroundColor: (fields.pagePreferences && fields.pagePreferences.backgroundColor) || '#eee',
    direction: activeLanguage.type
  };

  return (
    <Fragment>
      {loading.product && (
        <ProductBuilderSkelton />
      )}
      <div className={`checkout-wizard-page ${enableDarkTheme ? 'dark-mode' : 'default-mode'} ${loading.product ? 'loading' : ''}`}>
        <Header
          onChange={onChange}
          onDisplayChange={onDisplayChange}
          displayType={displayType}
          category={fields.category}
          subdomain={subdomain}
          product={fields}
          onSave={onSave}
          history={props.history}
        />
        <SideBar
          onChange={onChange}
          product={fields}
          category={fields.category}
          onSidebarChange={postSideChanging}
          onToggleDarkTheme={onToggleDarkTheme}
          darkTheme={enableDarkTheme}
          toggleTemplateChangeEffect={toggleTemplateChangeEffect}
          onTemplateChange={onTemplateChange}
        />
        <div
          style={workSpaceStyles}
          className={`product-workspace-container editor-workspace-wrapper ${isSidebarOpened ? 'side-opened' : ''}`}
        >
          <ProductEditableTemplate
            category={fields.category}
            className={`${displayType} ${templateChanging ? 'blur-effect' : ''}`}
            product={fields}
            language={activeLanguage}
            onChange={onChange}
            errors={errors}
          />
        </div>
      </div>
    </Fragment>
  );
};

ProductBuilder.propTypes = {
  history: PropTypes.objectOf({})
};

ProductBuilder.defaultProps = {
  products: [],
  history: {}
};

const mapStateToProps = ({
  translations,
  products: { products } = {},
  loading: globelLoading,
  user: { user: { subDomain: subdomain } }
}) => ({
  translations,
  products,
  subdomain,
  globelLoading
});

export default connect(mapStateToProps, { ...productActions, ...flashMessages, ...filesActions })(ProductBuilder);
