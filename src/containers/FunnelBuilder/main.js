/* eslint-disable max-depth */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import { funnelSchema } from 'libs/validation';
import { isFunction } from 'libs/checks';
import * as funnelActions from 'actions/funnels';
import * as flashMessages from 'actions/flashMessage';
import { extractProductsRelations, getStartPointProduct } from 'libs/funnels';
import queryString from 'querystring';
import * as immutable from 'object-path-immutable';
import {
  isObjectsEquivalent,
  mapListToObject,
  notification
} from 'libs';

import './style.css';

import {
  Header,
  Rules,
  SideBar,
  Workspace
} from './components';
import { withHistoryListener } from '../../history';

const hasPaypalPayment = ({ paymentMethods = [] } = {}) => {
  return paymentMethods.includes('Paypal');
};
const subscriptionPaymentTypes = ['Subscription', 'Split'];

const hasSubscriptionProduct = ({ products = [] } = {}, productsMap) => {
  const checkoutProduct = products.find(({ category }) => category === 'checkout');
  if (!checkoutProduct) return false;
  const startPointProduct = productsMap[checkoutProduct.productId];
  if (!startPointProduct) return false;

  const { payment: { type } = {} } = startPointProduct;
  return subscriptionPaymentTypes.includes(type);
};

const {
  Page,
  FlexBox,
  LayoutSwitch
} = common;

const FunnelBuilder = ({
  funnels,
  productsMap,
  subdomain,
  domains,
  registerHistoryListener,
  savedFunnel,
  saveFunnelState,
  ...props
}) => {
  const { history: { location = {} } = {}, match: { params: { url: funnelUrl } = {} } = {} } = props;

  const [fields, setFields] = useState(savedFunnel);
  const [errors, setErrors] = useState({});
  const { sub: activeSub = 'blocks' } = queryString.parse(location.search.replace('?', ''));
  const [activePage, setActivePage] = useState(activeSub);
  const [enableDarkTheme, setEnableDarkTheme] = useState(false);
  const [productsNodeDetails, setProductsNodeDetails] = useState(productsMap);
  const [unblock, SetUnblock] = useState();

  const [openRuleModal, setOpenRuleModal] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(true);

  const onToggleRuleModal = (activeRule, setActiveRule) => {
    setOpenRuleModal((open) => {
      if (activeRule && open && isFunction(setActiveRule)) setActiveRule();
      return !open;
    });
  };

  const onLocationChange = () => {
    saveFunnelState({ ...fields });
  };
  registerHistoryListener(onLocationChange);
  const changesDetected = () => {
    const unblock = props.history.block('Changes you made may not be saved.');
    SetUnblock(unblock);
  };
  const changesSaved = () => {
    if (isFunction(unblock))
      unblock();
  };


  const getFunnelByUrl = (funnelUrl) => funnels.find(({ url }) => url === funnelUrl);


  const isFunnelBuilderChanged = (oldObj, newObj) => {
    const importantProps = {
      currency: 'EUR',
      language: null,
      thankyouPage: null,
      url: 'second-funnel',
      category: 'checkout',
      elementId: 'G8zBuRcpl',
      relations: [],
      target: 'BoD92Nfle',
      type: 'upSell',
      marketPlace: {},
      featured: false,
      publish: true,
      description: '',
      products: [],
      name: 'First Funnel',
      paymentMethods: ['Stripe', 'COD'],
      productId: ''
    };

    for (const prop in newObj)
      if (!oldObj.hasOwnProperty(prop) && Boolean(newObj[prop])) return true;


    for (const prop in oldObj) {
      if (importantProps.hasOwnProperty(prop)) {
        switch (typeof (oldObj[prop])) {
        case 'object':
          if (Array.isArray(oldObj[prop]) && oldObj[prop].length === newObj[prop].length) {
            const hasObjects = Boolean(oldObj[prop].filter((ele) => typeof ele === 'object').length);

            if (hasObjects) {
              oldObj[prop].forEach((ele, i) => {
                isFunnelBuilderChanged(oldObj[prop][i], newObj[prop][i]);
              });
            } else {
              const res = JSON.stringify(oldObj[prop].sort()) !== JSON.stringify(newObj[prop].sort());
              if (res) return true;
            }


          } else if (Array.isArray(oldObj[prop]) && oldObj[prop].length !== newObj[prop].length) {
            return true;
          } else if (oldObj[prop] !== null) {
            isFunnelBuilderChanged(oldObj[prop], newObj[prop]);
          }
          break;

        default: if (!Object.is(oldObj[prop], newObj[prop])) return true;
        }
      }
    }

    return 'no check';
    // return false;
  };


  const onChange = ({ name, value }) => {
    const newFields = immutable.set(fields, name, value);
    setFields(newFields);
    setIsChangesSaved(false);

    const funnel = getFunnelByUrl(funnelUrl);
    const checkObj = isFunnelBuilderChanged(funnel, newFields);
    console.log('checkObj ??', checkObj);


    setErrors({ ...errors, [name]: '' });
    changesDetected();
  };


  const onToggleDarkTheme = () => {
    setEnableDarkTheme(!enableDarkTheme);
  };


  useEffect(() => {
    const funnel = getFunnelByUrl(funnelUrl);

    if (!funnel) return;
    if (funnel._id === fields._id) {
      if (!(funnel.rules === fields.rules) && !isObjectsEquivalent(funnel.rules, fields.rules))
        setFields(funnel);
      return;
    }

    if (!isObjectsEquivalent(funnel, fields))
      setFields(funnel);


    if (!isObjectsEquivalent(productsNodeDetails, productsMap))
      setProductsNodeDetails(productsMap);

    //eslint-disable-next-line
  }, [funnels, productsMap]);

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
      notification.failed('There is few invalid fields,check & try to save');
      return setErrors(errors);
    }

    const startPoint = getStartPointProduct(fields);
    if (startPoint) funnel.startPoint = startPoint;

    const productsUpdates = extractProductsRelations(funnel);

    const reformProductCategories = (product = {}) => {
      const category = (product.category === 'upSell' || product.category === 'downSell') ? 'upsell' : product.category;
      return { ...product, category };
    };
    const payload = {
      funnel: {
        ...funnel,
        products: funnel.products.map(reformProductCategories),
        funnelId: fields._id
      },
      productsUpdates
    };

    props.updateFunnel(
      payload,
      {
        onSuccess: () => {
          notification.success('Funnel Saved Successfully');
          changesSaved();
          updateUrlOnChange(fields.url);
          setIsChangesSaved(true);
        },
        onFailed: (message) => {
          notification.failed(message);
        }
      }
    );
  };


  useEffect(() => {
    props.history.push(`?sub=${activePage}`);
  }, [activePage]);

  const onPageChange = (page) => () => {
    setActivePage(page);
  };

  const headerProps = {
    onChange,
    onPageChange,
    activePage,
    subdomain,
    domains,
    onToggleRuleModal,
    funnel: fields,
    onSave,
    isChangesSaved,
    history: props.history
  };
  const isOptInFunnel = fields.type && fields.type === 'OPT-IN';

  const sidebarProps = {
    onChange,
    funnel: fields,
    onToggleDarkTheme,
    darkTheme: enableDarkTheme,
    isOptInFunnel
  };
  const workSpaceProps = {
    funnel: fields,
    onChange,
    productsNodeDetails,
    errors,
    history: props.history,
    isOptInFunnel
  };

  const rulesProps = {
    funnelId: fields._id,
    rules: fields.rules,
    openRuleModal,
    onToggleRuleModal,
    isOptInFunnel,
    isPaypalConnected: hasPaypalPayment(fields),
    isSubscriptionCheckout: hasSubscriptionProduct(fields, productsMap),
    funnelProducts: fields.products
  };
  return (
    <Page fullSize className='flex-container flex-column'>
      <Header {...headerProps} />
      <LayoutSwitch active={activePage}>
        <FlexBox id='blocks' flex className='relative-element'>
          <SideBar {...sidebarProps} />
          <Workspace {...workSpaceProps} />
        </FlexBox>
        <Rules id='rules' {...rulesProps} />
      </LayoutSwitch>
    </Page>
  );
};

FunnelBuilder.propTypes = { history: PropTypes.objectOf({}) };

FunnelBuilder.defaultProps = {
  productsMap: {},
  funnels: [],
  history: {}
};

const nodeProjectProjection = { thumbnail: 'image', name: 'name', payment: 'payment' };

const mapStateToProps = ({
  products: { products } = {},
  funnels,
  loading: globelLoading,
  settings: {
    generalModel: {
      subDomain: subdomain,
      domains = []
    } = {}
  } = {},
  workspace: { savedFunnel }
}) => {
  const productsMap = mapListToObject(products, '_id', nodeProjectProjection);
  return ({
    productsMap,
    subdomain,
    domains,
    globelLoading,
    funnels,
    savedFunnel
  });
};
export default withHistoryListener(connect(mapStateToProps, { ...funnelActions, ...flashMessages })(FunnelBuilder));
