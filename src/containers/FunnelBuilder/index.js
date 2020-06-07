import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import { funnelSchema } from 'libs/validation';
import { isFunction } from 'libs/checks';
import * as funnelActions from 'actions/funnels';
import * as flashMessages from 'actions/flashMessage';
import { extractProductsRelations, getStartPointProduct } from 'libs/funnels';
import {
  isObjectsEquivalent,
  mapListToObject,
  notification
} from 'libs';
// import isEqualObjects from 'react-fast-compare';


import './style.css';

import {
  Header,
  Rules,
  SideBar,
  Workspace
} from './components';

const PaymentMethodNamesMap = (paymentName) => {
  return {
    Stripe: 'lc_stripe',
    Paypal: 'lc_paypal'
  }[paymentName] || undefined;
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
  // globelLoading,
  ...props
}) => {
  const { url: funnelUrl } = props.match.params;

  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [activePage, setActivePage] = useState('blocks');
  const [enableDarkTheme, setEnableDarkTheme] = useState(false);

  const [productsNodeDetails, setProductsNodeDetails] = useState(productsMap);

  const [unblock, SetUnblock] = useState();


  const changesDetected = () => {
    const unblock = props.history.block('Changes you made may not be saved.');
    SetUnblock(unblock);
    // stopTabClosing(true);
  };

  const changesSaved = () => {
    if (isFunction(unblock))
      unblock();
    // stopTabClosing(false);
  };

  const onChange = ({ name, value }) => {
    setFields({ ...fields, [name]: value });
    setErrors({ ...errors, [name]: '' });
    changesDetected();
  };


  const onToggleDarkTheme = () => {
    setEnableDarkTheme(!enableDarkTheme);
  };

  const getFunnelByUrl = (funnelUrl) => funnels.find(({ url }) => url === funnelUrl);

  useEffect(() => {
    const funnel = getFunnelByUrl(funnelUrl);

    if (!funnel) return;

    if (!isObjectsEquivalent(funnel, fields)) {
      console.log('Funnel Updated');
      setFields({
        ...funnel,
        paymentMethods: PaymentMethodNamesMap(funnel.paymentMethods)
      });
    }
    if (funnel._id === fields._id) return;

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

    const startPoint = getStartPointProduct(funnel);
    if (startPoint) funnel.startPoint = startPoint;

    const productsUpdates = extractProductsRelations(funnel);

    const payload = {
      funnel: {
        ...funnel,
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
        },
        onFailed: (message) => {
          notification.failed(message);
        }
      }
    );
  };


  const onPageChange = (page) => () => {
    setActivePage(page);
  };

  const headerProps = {
    onChange,
    onPageChange,
    activePage,
    subdomain,
    domains,
    funnel: fields,
    onSave,
    history: props.history
  };

  const sidebarProps = {
    onChange,
    funnel: fields,
    onToggleDarkTheme,
    darkTheme: enableDarkTheme
  };
  const workSpaceProps = {
    funnel: fields,
    onChange,
    productsNodeDetails,
    errors,
    history: props.history
  };

  const rulesProps = {
    funnelId: fields._id,
    rules: fields.rules,
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

const nodeProjectProjection = { thumbnail: 'image', name: 'name' };

const mapStateToProps = ({
  products: { products } = {},
  funnels,
  loading: globelLoading,
  settings: {
    generalModel: {
      subDomain: subdomain,
      domains = []
    } = {}
  } = {}
}) => {

  const productsMap = mapListToObject(products, '_id', nodeProjectProjection);
  return ({
    productsMap,
    subdomain,
    domains,
    globelLoading,
    funnels
  });
};
export default connect(mapStateToProps, { ...funnelActions, ...flashMessages })(FunnelBuilder);
