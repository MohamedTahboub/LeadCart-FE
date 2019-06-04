import React, { useState, Fragment } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';

import ScriptsModal from 'components/ScriptsModal';
const {
  InputRow,
  Title,
  Button,
} = common;

const castFulfillmentList = (fulfillments) => fulfillments.map(({ name: label, _id: value }) => ({ label, value }));

const General = ({
  fulfillments,
  product: {
    scripts = {}, // { fbPixelId = '' } = {},
    fulfillment: fulfillmentId,
    url
  } = {},
  subdomain,
  onChange,
  errors = {},
  thankyouPage
}) => {
  const [showScriptsModal, setShowScriptsModal] = useState(false);


  return (
    <div className='product-form-general-settings bottom-breakline'>
      <Title>General Settings</Title>
      <InputRow>
        <InputRow.Label error={errors.url}>URL</InputRow.Label>
        <InputRow.UrlSuffixInput
          error={errors.url}
          name='url'
          onChange={onChange}
          subdomain={subdomain}
          value={url}
        >
        </InputRow.UrlSuffixInput>
      </InputRow>
      <InputRow>
        <InputRow.Label>Fulfillment</InputRow.Label>
        <InputRow.SearchInput
          // size='small'
          options={castFulfillmentList(fulfillments)}
          defaultValue={fulfillmentId}
          name='fulfillment'
          error={errors.fulfillment}
          onChange={onChange}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>
          Product Scripts
        </InputRow.Label>
        <Button className='share-btn' onClick={() => setShowScriptsModal(true)}>
          <i className='fas fa-code' />
          Show Scripts
        </Button>
      </InputRow>
      <ScriptsModal
        isVisible={showScriptsModal}
        scripts={scripts}
        onChange={onChange}
        onClose={() => setShowScriptsModal(false)}
      />
      {/*
      <Collapsible>
        <InputRow>
          <InputRow.Label>Thankyou page</InputRow.Label>
          <InputRow.UrlInput
            name='thankyouPage'
            onChange={onChange}
            value={thankyouPage}
            prefix='http://'
          />
        </InputRow>
      </Collapsible> */}
    </div>
  );
};


const mapStateToProps = ({
  fulfillments: { list: fulfillments = [] } = {},
  user: { user: { subDomain: subdomain } = {} } = {}
}) => ({ subdomain, fulfillments });

export default connect(mapStateToProps)(General);


function Collapsible ({ expanded, children }) {
  const [collapse, setCollapse] = useState(expanded);

  const onToggleCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <Fragment>
      <div className={`section-collapsible ${collapse ? '' : 'collapse'}`}>
        {children}
      </div>
      <span
        className='collapsible-handle'
        onClick={onToggleCollapse}
      >
        {`${collapse ? 'less options' : 'more options'}`}
      </span>
    </Fragment>
  );
}
