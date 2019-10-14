import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import { ProductSchema } from 'libs/validation';
import * as productActions from 'actions/product';
import * as flashMessages from 'actions/flashMessage';
import { stopTabClosing } from 'libs';
// import  ProductEditableTemplate  from './';
import { SideBar, Header, ProductEditableTemplate } from './components';
import './style.css';

const {
  Page,
  PageHeader,
  PageContent,
  // NewThingCard,
  // MainTitle,
  // Button
} = common;

const ProductBuilder = ({
  products, subdomain, globelLoading, ...props
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
    setFields({ ...fields, [name]: value });
    setErrors({ ...errors, [name]: '' });
    changesDetected();
  };

  const onToggleDarkTheme = () => {
    setEnableDarkTheme(!enableDarkTheme);
  };
  useEffect(() => {
    const { url } = props.match.params;
    const product = products.find(({ url: u }) => u === url) || {};
    setFields(product);

    if (product._id) setLoading({ product: false });
    return () => {
      setFields({});
    };
  }, [products, globelLoading]);

  const onDisplayChange = (type) => {
    setDisplayType(type);
  };

  const updateUrlOnChange = (updatedUrl) => {
    const { url: currentUrl } = props.match.params;
    if (updatedUrl !== currentUrl) props.history.push(updatedUrl);
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
          updateUrlOnChange(fields.url);
        },
        onFailed: (message) => {
          props.showFlashMessage({
            type: 'failed',
            message: `Check the Fields And Try a gain\n${errors}`
          });
        }
      }
    );
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

  return (
    <Fragment>
      {loading.product && (
        <div className='loading-layer'>
          <div className='loading-message'>Setting Up...</div>
        </div>
      )}
      <div className={`checkout-wizard-page ${enableDarkTheme ? 'dark-mode' : 'default-mode'} ${loading.product ? 'loading' : ''}`}>
        <Header
          onChange={onChange}
          onDisplayChange={onDisplayChange}
          displayType={displayType}
          type={fields.type}
          subdomain={subdomain}
          product={fields}
          onSave={onSave}
          history={props.history}
        />
        <SideBar
          onChange={onChange}
          product={fields}
          type={fields.type}
          onSidebarChange={postSideChanging}
          onToggleDarkTheme={onToggleDarkTheme}
          darkTheme={enableDarkTheme}
          toggleTemplateChangeEffect={toggleTemplateChangeEffect}
        />
        <div className={`product-workspace-container ${isSidebarOpened ? 'side-opened' : ''}`}>
          <ProductEditableTemplate
            // type=''
            className={`${displayType} ${templateChanging ? 'blur-effect' : ''}`}
            product={fields}
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
  products: { products } = {},
  loading: globelLoading,
  user: { user: { subDomain: subdomain } }
}) => ({ products, subdomain, globelLoading });
export default connect(mapStateToProps, { ...productActions, ...flashMessages })(ProductBuilder);
