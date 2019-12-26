import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
// import * as modalsActions from 'actions/modals';
import * as funnelsActions from 'actions/funnels';
import * as productsActions from 'actions/products';
import * as flashMessages from 'actions/flashMessage';



import config from 'config';


import { Modal } from 'components/Modals';
import common from 'components/common';

import {
  PreCreateModal
} from './components';

import './style.css';

const { USER_SUB_DOMAIN_URL } = config;
const {
  FunnelCard,
  Page,
  PageHeader,
  PageContent,
  MainTitle,
  Button
} = common;

// const { SearchInput, Checkbox } = InputRow;

const getValidDomain = (domains = []) => {
  return domains.find(({ verified, connected }) => verified && connected)
}
// const ProductShadowLoading = () => <div className='empty-product-shadowbox animated-background' />;

const Funnels = ({
  funnels,
  filtersLabels,
  deleteFunnel,
  subdomain,
  domains,
  ...props
}) => {

  console.log("domains=>",domains)
  const [showDelete, setShowDelete] = useState('');
  // eslint-disable-next-line
  const [creatingFunnel, setCreateFunnel] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const onFunnelEdit = (url) => {
    props.history.push(`/funnels/${url}`);
  };



  const onShowDeleteDialogue = (id) => setShowDelete(id);
  const onHideDeleteDialogue = () => setShowDelete('');

  const onFunnelDelete = () => {
    deleteFunnel(
      { funnelId: showDelete },
      {
        onSuccess: () => {
          props.showFlashMessage({
            type: 'success',
            message: `Funnel Deleted Successfully`
          });
          onHideDeleteDialogue()
        },
        onFailed: (msg) => {
          props.showFlashMessage({
            type: 'failed',
            message: msg
          });
        }
      }

    );
  };

  const onCreate = () => {
    setShowCreateModal(true);
  };

  const onCreateCancel = () => {
    setShowCreateModal(false);
  };



  const onPreview = (funnelUrl) => {
    const domain = getValidDomain(domains)

    let url;
    if (domain && domain.domain)
      url = `https://${domain.domain}/${funnelUrl}`;
    else
      url = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${funnelUrl}`;

    // const funnelUrl = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${url}`;
    window.open(url, '_blank');
  }

  // useEffect(() => {

  // }, [subdomain, domains])
  return (
    <Fragment>
      <Page>
        <PageHeader>
          <div className='margin-h-20 flex-container fb-aligned-center'>
            <MainTitle>Funnels</MainTitle>
          </div>
          <Button onClick={onCreate} className='primary-color'>
            <i className='fas fa-plus' />
            new funnel
          </Button>
        </PageHeader>
        <PageContent dflex>
          {!!funnels.length && funnels.map((funnel, id) => (
            <FunnelCard
              {...funnel}
              key={`${funnel._id}`}
              orderInlist={id}
              onDelete={() => onShowDeleteDialogue(funnel._id)}
              onEdit={() => onFunnelEdit(funnel.url)}
              // onDuplicate={() => onProductDuplicate(product)}
              onPreview={() => onPreview(funnel.url)}
            />
          ))
          }
        </PageContent>


        <PreCreateModal
          show={showCreateModal}
          history={props.history}
          onClose={onCreateCancel}
        />


        {!!showDelete && (
          <Modal onClose={onHideDeleteDialogue} isVisible={showDelete}>
            <MainTitle>Are you sure,you want delete this funnel?</MainTitle>
            <Button onClick={onHideDeleteDialogue} className='primary-color margin-with-float-left'>
              {' '}
              Cancel
            </Button>
            <Button onClick={onFunnelDelete} className='warning-color margin-with-float-right'>
              <i className='fas fa-trash-alt' />
              {' '}
              Delete
            </Button>
          </Modal>
        )}

      </Page>
      {creatingFunnel && (
        <div className='loading-layer'>
          <div className='loading-message'>Setting Up Funnel Builder...</div>
        </div>
      )}
    </Fragment>
  );
};



const mapStateToProps = ({
  loading,
  funnels,
  products,
  settings: {
    generalModel: {
      subDomain :subdomain,
      domains = []
    } = {}
  } = {}
}) => ({
  isFetching: loading,
  subdomain,
  domains,
  funnels,
  products: products.products.map((p) => ({ ...p, category: p.category || 'Checkout' })),
  filtersLabels: [
    { label: 'All Products', value: 'all' },
    ...products.products.map((p) => ({ label: p.name, value: p._id || p.id }))
  ]
});

Funnels.defaultProps = {
  funnels: []
};

export default connect(mapStateToProps, { ...productsActions, ...funnelsActions, ...flashMessages })(Funnels);
