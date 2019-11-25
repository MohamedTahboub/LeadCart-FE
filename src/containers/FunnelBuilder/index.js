import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import { funnelSchema } from 'libs/validation';
import * as funnelActions from 'actions/funnels';
import * as flashMessages from 'actions/flashMessage';
import { extractProductsRelations, getStartPointProduct } from 'libs/funnels'
import { ProductBuilderSkelton } from 'components/Loaders';
import { SideBar, Header, FunnelWorkspace } from './components';

import './style.css';

// const {
//   Page,
//   PageHeader,
//   PageContent,

// } = common;

const FunnelBuilder = ({
  funnels,
  products,
  subdomain,
  globelLoading,
  ...props
}) => {
  const [isNew, setIsNew] = useState(true);
  const [fields, setFields] = useState({});
  // const [displayType, setDisplayType] = useState('desktop');
  // const [changesDetected, setChangesDetected] = useState(false)
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState({ product: true });

  const [templateChanging, setTemplateChanging] = useState(false);

  const [isSidebarOpened, setSidebarOpened] = useState(false);

  const [enableDarkTheme, setEnableDarkTheme] = useState(false);

  const [unblock, SetUnblock] = useState();

  const [productsNodeDetails, setProductsNodeDetails] = useState({});



  const changesDetected = () => {
    const unblock = props.history.block('Changes you made may not be saved.');
    SetUnblock(unblock);
    // stopTabClosing(true);
  };

  const changesSaved = () => {
    typeof unblock === 'function' && unblock();
    // stopTabClosing(false);
  };

  const onChange = ({ name, value }) => {
    console.log(name, value)
    setFields({ ...fields, [name]: value });
    setErrors({ ...errors, [name]: '' });
    changesDetected();
  };

  const onToggleDarkTheme = () => {
    setEnableDarkTheme(!enableDarkTheme);
  };
  useEffect(() => {
    const { url: funnelUrl } = props.match.params;

    if (funnelUrl !== 'new') setIsNew(false);

    const funnel = funnels.find(({ url }) => url === funnelUrl) || {};
    if (funnel.url !== fields.url) setFields(funnel);

    if (funnel._id) setLoading({ funnel: false });


    const productsDetails = products
      .filter(({ thumbnail }) => thumbnail)
      .reduce((obj, product) => {
        obj[product._id] = {
          image: product.thumbnail,
          name: product.name
        }
        return obj
      }, {})

    if (Object.keys(productsDetails).length)
      setProductsNodeDetails(productsDetails)

    return () => {
      // setFields({});
    };
  }, [funnels, globelLoading]);

  // const onDisplayChange = (type) => {
  //   setDisplayType(type);
  // };

  const updateUrlOnChange = (currentUrl) => {
    const { url } = props.match.params;
    if (currentUrl !== url) props.history.push(currentUrl);
  };

  const onSave = async () => {
    const {
      isValid,
      errors,
      value: funnel
    } = await funnelSchema(fields);

    if (!isValid) {
      props.showFlashMessage({
        type: 'failed',
        message: `Check the funnel Fields And Try a gain`
      });
      return setErrors(errors);
    }



    const action = isNew ? props.createFunnel : props.updateFunnel;
    const payload = isNew ? { funnel } : { funnel: { ...funnel, funnelId: fields._id } };

    const startPoint = getStartPointProduct(funnel)
    if (startPoint) {
      payload.funnel.startPoint = startPoint
    }
    payload.productsUpdates = extractProductsRelations(funnel)

    action(
      payload,
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
            message: `Check the Fields And Try a gain\n${message}`
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
      {loading.funnel && (
        <ProductBuilderSkelton />
      )}
      <div className={`checkout-wizard-page ${enableDarkTheme ? 'dark-mode' : 'default-mode'} ${loading.funnel ? 'loading' : ''}`}>
        <Header
          // onDisplayChange={onDisplayChange}
          onChange={onChange}
          subdomain={subdomain}
          funnel={fields}
          onSave={onSave}
          isNew={isNew}
          history={props.history}
        />
        <SideBar
          onChange={onChange}
          funnel={fields}
          onSidebarChange={postSideChanging}
          onToggleDarkTheme={onToggleDarkTheme}
          darkTheme={enableDarkTheme}
          toggleTemplateChangeEffect={toggleTemplateChangeEffect}
        />
        <div className={`product-workspace-container ${isSidebarOpened ? 'side-opened' : ''}`}>
          <FunnelWorkspace
            className={`${templateChanging ? 'blur-effect' : ''}`}
            funnel={fields}
            onChange={onChange}
            productsNodeDetails={productsNodeDetails}
            errors={errors}
          />
        </div>

      </div>
    </Fragment>
  );
};

FunnelBuilder.propTypes = {
  history: PropTypes.objectOf({})
};

FunnelBuilder.defaultProps = {
  products: [],
  funnels: [],
  history: {}
};

const mapStateToProps = ({
  products: { products } = {},
  funnels,
  loading: globelLoading,
  user: { user: { subDomain: subdomain } }
}) => ({ products, subdomain, globelLoading, funnels });
export default connect(mapStateToProps, { ...funnelActions, ...flashMessages })(FunnelBuilder);
