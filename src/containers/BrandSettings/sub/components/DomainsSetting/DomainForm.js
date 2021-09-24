import React, { Fragment, useState } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';

import { connect } from 'react-redux';
import * as settingsActions from 'actions/settings';
import { FlexBox } from 'components/common/boxes';

const {
  InputRow,
  // MainBlock,
  Button
  // MiniButton
} = common;


const DomainForm = ({ domains, connectMarketPlaceDomain }) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const haveDomains = domains.length;

  const onChange = ({ target: { value } }) => {
    setValue(value);
    if (error) setError();
  };


  const onConnect = () => {
    setLoading(true);
    connectMarketPlaceDomain(
      { domain: value && value.trim() },
      {
        onSuccess: (data) => {
          setLoading(false);
          setError();
        },
        onFailed: (err) => {
          setError(err);
          setLoading(false);
        }
      }
    );
  };

  return (
    <Fragment>
      <strong className='title '>Connect Your Custom domain</strong>
      <FlexBox className='pl-3' column>
        <InputRow margin='20'>
          <InputRow.Label
            notes='Enter the domain you want to connect, without the http or https.'
          >
            Custom Domain Name:
          </InputRow.Label>
          <InputRow.TextField
            name='customDomain'
            onChange={onChange}
            placeholder='e.g. example.com'
            error={error}
            value={value}
            disabled={haveDomains}
          />
          <Button
            disabled={loading || haveDomains}
            onprogress={loading}
            onClick={onConnect}
            className='margin-left-30 primary-color'
          >
            Connect
          </Button>
        </InputRow>
        {error && (
          <div className='flex-container flex-start'>
            <div className='note error-note'>
              {error}
            </div>
          </div>
        )}
      </FlexBox>
    </Fragment>
  );
};

DomainForm.propTypes = {};


export default connect(null, settingsActions)(DomainForm);
