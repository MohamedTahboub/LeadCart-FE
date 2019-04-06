import React, { useState, Fragment } from 'react';
import common from 'components/common';
import { connect } from 'react-redux'

const { InputRow, Title } = common;

const fulfillmentList = [
  { label: 'Undetermined', value: 'default' },
  { label: 'Product X fulfillment', value: 'theXId' },
  { label: 'Test Product  fulfillment', value: 'theXIsd' }
];

const General = ({ product = {}, subdomain, onChange, errors = {}, url, fulfillmentId, fbPixelId, thankyouPage }) => {

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
          value={product.url}
        >
        </InputRow.UrlSuffixInput>
      </InputRow>
      <InputRow>
        <InputRow.Label>Fulfillment</InputRow.Label>
        <InputRow.SearchInput
          // size='small'
          options={fulfillmentList}
          defaultValue={fulfillmentId}
          name='fulfillment'
          error={errors.fulfillment}
          onChange={onChange}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>
          Facebook Pixel ID
      </InputRow.Label>
        <InputRow.NormalInput
          name='scripts.fbPixelId'
          onChange={onChange}
          value={fbPixelId}
        >
          Ex. 254179138569861
      </InputRow.NormalInput>
      </InputRow>
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
      </Collapsible>*/}
    </div>
  );
}


const mapStateToProps = ({
  user: { user: { subDomain: subdomain } = {} } = {}
}) => ({ subdomain });

export default connect(mapStateToProps)(General);



function Collapsible({ expanded, children }) {
  const [collapse, setCollapse] = useState(expanded)

  const onToggleCollapse = () => {
    setCollapse(!collapse);
  }
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
  )
}