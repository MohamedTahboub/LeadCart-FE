import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as funnelsActions from 'actions/funnels';
import * as productsActions from 'actions/products';
import { notification } from 'libs';
import { Modal } from 'components/Modals';
import common from 'components/common';
import { FunnelCard, FunnelsShadowLoading, PreCreateModal } from './components';
import { getMarketPlaceUrl } from 'helpers/common';


import './style.css';

const {
  Page,
  PageHeader,
  PageContent,
  MainTitle,
  Button
} = common;


const Funnels = ({
  funnels,
  isFetching,
  deleteFunnel,
  subDomain,
  defaultCurrency,
  domains,
  ...props
}) => {
  const [showDelete, setShowDelete] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const onFunnelEdit = (url) => () => {
    props.history.push(`/funnels/${url}`);
  };

  const onShowDeleteDialogue = (id) => () => setShowDelete(id);
  const onHideDeleteDialogue = () => setShowDelete('');

  const onFunnelDelete = () => {
    deleteFunnel(
      { funnelId: showDelete },
      {
        onSuccess: () => {
          notification.success('Funnel Deleted Successfully');
          onHideDeleteDialogue();
        },
        onFailed: (message) => {
          notification.failed(message);
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


  const onPreview = (funnelUrl) => () => {
    const url = getMarketPlaceUrl({ domains, subDomain });
    window.open(`${url}${funnelUrl}`, '_blank');
  };

  const hasFunnels = funnels.length > 0;

  return (
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

      <PageContent dflex className='align-content-start'>
        {funnels.map((funnel, id) => (
          <FunnelCard
            {...funnel}
            key={`${funnel._id}`}
            orderInList={id}
            onDelete={onShowDeleteDialogue(funnel._id)}
            onEdit={onFunnelEdit(funnel.url)}
            onPreview={onPreview(funnel.url)}
          />
        ))
        }

        {(!hasFunnels && isFetching) && <FunnelsShadowLoading/>}

      </PageContent>

      <PreCreateModal
        show={showCreateModal}
        history={props.history}
        onClose={onCreateCancel}
        defaultCurrency={defaultCurrency}
      />

      {!!showDelete && (
        <Modal onClose={onHideDeleteDialogue} isVisible={showDelete}>
          <MainTitle>Are you sure,you want delete this funnel?</MainTitle>
          <Button onClick={onHideDeleteDialogue} className='primary-color margin-with-float-left'>
            Cancel
          </Button>
          <Button onClick={onFunnelDelete} className='danger-bg margin-with-float-right'>
            <i className='fas fa-trash-alt' />
              Delete
          </Button>
        </Modal>
      )}
    </Page>
  );
};

const mapStateToProps = ({
  loading,
  funnels,
  products,
  settings: {
    generalModel: {
      subDomain,
      currency: defaultCurrency = 'USD',
      domains = []
    } = {}
  } = {}
}) => ({
  isFetching: loading,
  subDomain,
  domains,
  funnels,
  defaultCurrency,
  products: products.products.map((p) => ({ ...p, category: p.category || 'Checkout' })),
  filtersLabels: [
    { label: 'All Products', value: 'all' },
    ...products.products.map((p) => ({ label: p.name, value: p._id || p.id }))
  ]
});

Funnels.defaultProps = { funnels: [] };

export default connect(mapStateToProps, { ...productsActions, ...funnelsActions })(Funnels);
