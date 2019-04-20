import React, { useState, useEffect } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as fulfillmentsActions from 'actions/fulfillments';
import PropTypes from 'prop-types';
import { FulfillmentForm } from './components';
import './style.css'
const {
    MainTitle,
    Button,
    Page,
    FulfillmentCard,
    PageHeader,
    PageContent
} = common;

const fulfillmentsTypesLabels = {
    'successUrls': "Success Urls Fulfillments",
    'noFulfillment': "No Fulfillment",
    'manual': "Manual Fulfillment",
    'integration': "Zapier Integration Fulfillment"
}

const Fulfillments = ({
    fulfillments
}) => {

    const [showForm, setShowForm] = useState(false)

    const onShowForm = () => {
        setShowForm(true)
    }
    const onHideForm = () => {
        setShowForm(false)
    }
    const onShowEditForm = (fulfillment) => {
        setShowForm(fulfillment)
    }

    return (
        <Page>
            <PageHeader className='space-between-elements'>
                <MainTitle>Fulfillments</MainTitle>
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
                        onDelete={() => { }}

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
        </Page>
    );
}

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

