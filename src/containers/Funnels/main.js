import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as funnelsActions from 'actions/funnels';
import * as productsActions from 'actions/products';
import { notification } from 'libs';
import config from 'config';
import { Modal } from 'components/Modals';
import common from 'components/common';
import { FunnelCard, PreCreateModal } from './components';
import './style.css';

const { USER_SUB_DOMAIN_URL } = config;
const {
  Page,
  PageHeader,
  PageContent,
  MainTitle,
  Button
} = common;


const getValidDomain = (domains = []) => domains.find(({ verified, connected }) => verified && connected);

const Funnels = ({
  funnels,
  filtersLabels,
  deleteFunnel,
  subdomain,
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
    const domain = getValidDomain(domains);
    let url;

    if (domain && domain.domain) url = `https://${domain.domain}/${funnelUrl}`;
    else url = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${funnelUrl}`;

    window.open(url, '_blank');
  };

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
      subDomain: subdomain,
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

Funnels.defaultProps = { funnels: [] };

export default connect(mapStateToProps, { ...productsActions, ...funnelsActions })(Funnels);
