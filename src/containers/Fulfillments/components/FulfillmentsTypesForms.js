import React, { Fragment } from 'react';
import common from 'components/common';
import SuccessUrls from 'components/SuccessUrls';
const {
  InputRow,
  BlankLink,
  Note
} = common;


const NoFulfillment = () => (
  <Note
    referenceLink='https://help.leadcart.io'
    image='https://via.placeholder.com/150x150'
  >
    we will not do any action if this type of fulfillments
    is selected, however there is few cases where you need it.
  </Note>
);

const ManualFulfillment = ({
  onChange,
  data: {
    metaData: {
      serviceName,
      description,
      enabled
    } = {}
  } = {},
  errors = {}
}) => (
  <Fragment>
    <Note
      referenceLink='https://help.leadcart.io'
    >
        We need few information about the service so that
         we can send it to your customers when they purchase
          from you, we will send these fields in the receipts
          order details by email.
    </Note>
    <InputRow>
      <InputRow.Label>
          Enable Service Details:
      </InputRow.Label>
      <InputRow.SwitchInput
        name='enabled'
        onToggle={() => onChange({
          target: {
            name: 'metaData.enabled',
            value: !enabled
          }
        })
        }
        value={enabled}
      />
    </InputRow>
    <InputRow>
      <InputRow.Label>
          Service Name:
      </InputRow.Label>
      <InputRow.NormalInput
        name='metaData.serviceName'
        disabled={!enabled}
        onChange={onChange}
        value={serviceName}
        error={errors.serviceName}
      />
    </InputRow>
    <InputRow>
      <InputRow.Label>
          Service Description:
      </InputRow.Label>
      <InputRow.TextAreaInput
        name='metaData.description'
        disabled={!enabled}
        className='service-description-textarea'
        onChange={onChange}
        value={description}
        error={errors.description}
      />
    </InputRow>
  </Fragment>
);
const SuccessUrlsFulfillment = ({ data: { successUrls } = {}, onChange }) => (
  <Fragment>
    <Note
      referenceLink='https://help.leadcart.io/fulfillments/zapier'
      image='https://s3.us-east-2.amazonaws.com/static.leadcart.io/5cc2ee577e6fd00200c981d2/products/secure-link.png'
    >
      we will send an email on a new order associated with this fulfillment with a secure link,
      you can add more than one success URL , however on a product of one-time payment type,
      offers and upsells we will just consider the first link,
      and on Subscriptions, we will send them one on each subscription/split charge, until on iteration left.

    </Note>
    <SuccessUrls list={successUrls} onChange={onChange} />
  </Fragment>
);

const Integration = () => (
  <Note
    referenceLink='https://help.leadcart.io/fulfillments/zapier'
    image='http://f4d.nl/super-forms/wp-content/uploads/2017/02/zapier.png'
  >
    fulfilling your orders with Zapier integrations,
    using zapier you can do so much with your products,
    you can give access or revoke, add customers to email
     lists and much more when tacking zapier advantages
      by integrating your orders with apps available on zapier
       platform,
    {(
      <BlankLink
        to='https://help.leadcart.io/fulfillments/zapier'
      >
        {' read more...'}
      </BlankLink>
    )}
  </Note>
);


const FulfillmentsTypesForms = ({ type, ...props }) => {
  switch (type) {
  case 'noFulfillment': return <NoFulfillment {...props} />;
  case 'manual': return <ManualFulfillment {...props} />;
  case 'successUrls': return <SuccessUrlsFulfillment {...props} />;
  case 'integration': return <Integration {...props} />;
  default: return null;
  }
};

export default FulfillmentsTypesForms;
