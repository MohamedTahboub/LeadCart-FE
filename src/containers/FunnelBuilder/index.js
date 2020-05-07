import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import { funnelSchema } from 'libs/validation';
import * as funnelActions from 'actions/funnels';
import * as flashMessages from 'actions/flashMessage';
import { extractProductsRelations, getStartPointProduct } from 'libs/funnels';
import { notification } from 'libs';


import './style.css';

import {
  Header,
  Rules,
  SideBar,
  FunnelWorkspace as Workspace
} from './components';

const {
  Page,
  FlexBox,
  LayoutSwitch
} = common;

const FunnelBuilder = ({
  funnels,
  products,
  subdomain,
  domains,
  globelLoading,
  ...props
}) => {
  const [isNew, setIsNew] = useState(true);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [activePage, setActivePage] = useState('blocks');
  const [enableDarkTheme, setEnableDarkTheme] = useState(false);

  const [productsNodeDetails, setProductsNodeDetails] = useState({});

  const [unblock, SetUnblock] = useState();


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
    console.log(name, value);
    setFields({ ...fields, [name]: value });
    setErrors({ ...errors, [name]: '' });
    changesDetected();
  };

  console.log('FUnnel', fields);

  const onToggleDarkTheme = () => {
    setEnableDarkTheme(!enableDarkTheme);
  };
  useEffect(() => {
    const { url: funnelUrl } = props.match.params;

    if (funnelUrl !== 'new') setIsNew(false);

    const funnel = funnels.find(({ url }) => url === funnelUrl) || {};
    if (funnel.url !== fields.url) setFields(funnel);
    if ((funnel.rules && funnel.rules.length) !== (fields.rules && fields.rules.length)) setFields(funnel);

    // if (funnel._id) setLoading({ funnel: false });


    const productsDetails = products
      .filter(({ thumbnail }) => thumbnail)
      .reduce((obj, product) => {
        obj[product._id] = {
          image: product.thumbnail,
          name: product.name
        };
        return obj;
      }, {});

    if (Object.keys(productsDetails).length) setProductsNodeDetails(productsDetails);

    return () => {
      // setFields({});
    };
  }, [fields.rules, fields.url, funnels, globelLoading, products, props.match.params]);

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
        message: 'Check the funnel Fields And Try a gain'
      });
      notification.failed('There is few invalid fields,check & try to save');
      return setErrors(errors);
    }


    const action = isNew ? props.createFunnel : props.updateFunnel;
    const payload = isNew ? { funnel } : { funnel: { ...funnel, funnelId: fields._id } };

    const startPoint = getStartPointProduct(funnel);
    if (startPoint) payload.funnel.startPoint = startPoint;

    payload.productsUpdates = extractProductsRelations(funnel);

    action(
      { ...payload, iss: 'Www' },
      {
        onSuccess: (msg) => {
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
    isNew,
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
  products: [],
  funnels: [],
  history: {}
};

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
}) => ({ products, subdomain, domains, globelLoading, funnels });
export default connect(mapStateToProps, { ...funnelActions, ...flashMessages })(FunnelBuilder);
