import React, { useState } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as fulfillmentsActions from 'actions/fulfillments';
import PropTypes from 'prop-types';
import Dialog from 'components/common/Dialog';
import { FulfillmentForm } from './components';
import './style.css';
const {
  MainTitle,
  Button,
  Page,
  FulfillmentCard,
  PageHeader,
  PageContent
} = common;

const fulfillmentsTypesLabels = {
  successUrls: 'Success Urls Fulfillments',
  noFulfillment: 'No Fulfillment',
  manual: 'Manual Fulfillment',
  integration: 'Zapier Integration Fulfillment'
};

const Fulfillments = ({
  fulfillments,
  ...props
}) => {
  const [showForm, setShowForm] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const onShowForm = () => {
    setShowForm(true);
  };
  const onHideForm = () => {
    setShowForm(false);
  };
  const onShowEditForm = (fulfillment) => {
    setShowForm(fulfillment);
  };
  const showDeleteDialog = (fulfillmentId) => {
    setDeleteDialog(fulfillmentId);
  };
  const hideDeleteDialog = () => {
    setDeleteDialog('');
  };
  const onDeleteFulfillment = (fulfillment) => {
    props.deleteFulfillment(deleteDialog);
    hideDeleteDialog();
  };


  return (
    <Page>
      <PageHeader className='space-between-elements'>
        <MainTitle>Fulfillment</MainTitle>
        <Button
          onClick={onShowForm}
          className='primary-color'
        >
          <i className='fas fa-plus' />
          {' '}
                    new Fulfillment
        </Button>
      </PageHeader>
      <PageContent dflex>
        {fulfillments.map((fulfillment, id) => (
          <FulfillmentCard
            key={fulfillment._id}
            orderInlist={id}
            name={fulfillment.name}
            type={fulfillmentsTypesLabels[fulfillment.type]}
            onEdit={onShowEditForm.bind(this, fulfillment)}
            onDelete={() => showDeleteDialog(fulfillment._id)}
          />
        ))}
      </PageContent>
      {showForm && (
        <FulfillmentForm
          show
          data={showForm}
          isNew={typeof showForm === 'boolean'}
          onClose={onHideForm}
        />
      )}
      {deleteDialog && (<Dialog
        title='Deleting fulfillment'
        description='Are you sure,you want delete this fulfillment?'
        show
        onClose={hideDeleteDialog}
        confirmBtnText='Delete'
        onConfirm={onDeleteFulfillment}
      />
      )}
    </Page>
  );
};

Fulfillments.propTypes = {
  fulfillments: PropTypes.arrayOf(PropTypes.object)
};

Fulfillments.defaultProps = {
  fulfillments: []
};

const mapStatToProps = (state) => ({
  fulfillments: state.fulfillments.list
});

export default connect(mapStatToProps, fulfillmentsActions)(Fulfillments);

