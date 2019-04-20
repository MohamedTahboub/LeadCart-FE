import React, { useState, useEffect } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as fulfillmentsActions from 'actions/fulfillments';
import PropTypes from 'prop-types';
import { UpsellCard } from '../../components/UpsellCard';
import { FulfillmentForm } from './components';
import './style.css'
const {
    MainTitle,
    Button,
    Page,
    PageHeader,
    PageContent
} = common;

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
                    <UpsellCard
                        key={fulfillment._id}
                        orderInlist={id}
                        upsell={fulfillment}
                        onEdit={onShowEditForm.bind(this, fulfillment)}
                        linkedProduct={fulfillment.usedBy}
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

