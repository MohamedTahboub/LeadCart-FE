import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as funnelsActions from 'actions/funnels';
import * as productsActions from 'actions/products';
import { notification } from 'libs';
import { funnelDuplicateSchema } from 'libs/validation';
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
  createFunnel,
  ...props
}) => {
  const [showDelete, setShowDelete] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState();

  const onFunnelEdit = (url) => () => {
    props.history.push(`/funnels/${url}`);
  };

  const onShowDeleteDialogue = (id) => () => setShowDelete(id);
  const onHideDeleteDialogue = () => setShowDelete('');

  const onFunnelDelete = () => {
    setLoading('delete');
    deleteFunnel(
      { funnelId: showDelete },
      {
        onSuccess: () => {
          notification.success('Funnel Deleted Successfully');
          onHideDeleteDialogue();
          setLoading();
        },
        onFailed: (message) => {
          notification.failed(message);
          setLoading();
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


  const getFunnelDuplicatedName = (mainName, key) => {
    const funnelsNames = funnels.map(({ name }) => name);
    const funnelsUrls = funnels.map(({ url }) => url);
    const targetedData = key === 'url' ? funnelsUrls : funnelsNames;
    const hasOneCopy = targetedData.includes(`${mainName}-copy`);

    if (!hasOneCopy) {
      return `${mainName}-copy`;
    } else {
      const theCopiedNames = targetedData.filter((name) => name.slice(0, -1) === `${mainName}-copy-`);
      const theReservedNumbers = theCopiedNames.map((ele) => Number(ele[ele.length - 1])).sort((a, b) => a - b);
      let theCurrentCopyNumber = theReservedNumbers.length + 1;

      theReservedNumbers.forEach((ele, index) => {
        if (ele !== index + 1) {
          theCurrentCopyNumber = index + 1;
          return;
        }
      });

      return `${mainName}-copy-${theCurrentCopyNumber}`;
    }
  };


  const onDuplicate = (selectedFunnel) => async (e) => {
    const {
      isValid,
      value: funnel
    } = await funnelDuplicateSchema(selectedFunnel);

    if (!isValid) {
      notification.failed('Missing or invalid fields, please check your fields and try again');
      return;
    }

    const duplicatedFunnel = { ...funnel, url: getFunnelDuplicatedName(funnel.url, 'url'), name: getFunnelDuplicatedName(funnel.name) };


    setLoading('duplicate');
    createFunnel(
      { funnel: duplicatedFunnel },
      {
        onSuccess: () => {
          notification.success('Funnel Duplicated Successfully');
          setLoading();
        },
        onFailed: (message) => {
          notification.failed(message);
          setLoading();
        }
      }
    );
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
            onDuplicate={onDuplicate(funnel)}
            loading={loading}
          />
        ))
        }

        {(!hasFunnels && isFetching) && <FunnelsShadowLoading />}

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
          <Button onClick={onFunnelDelete} className='danger-bg margin-with-float-right' onprogress={loading === 'delete'}>
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
