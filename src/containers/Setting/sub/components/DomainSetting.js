import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as settingsActions from 'actions/settings';
import common from 'components/common';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './style.css';

const CopyIcon = ({ text }) => (
  <CopyToClipboard text={text}>
    <span className='copy-icon'>
      <i className='fas fa-copy' />
    </span>
  </CopyToClipboard>
);

const {
  InputRow, MainBlock, Button
} = common;

const VerificationProcess = ({
  verifying,
  connected,
  records = [],
  error
}) => {
  if (verifying) return null;

  if (!error && !connected) return null;


  if (error && error.includes('ENOTFOUND')) error = 'This domain does not seem to exist, Please check your domain name and try again';
  return (
    <div className='flex-container flex-start'>
      {error
        ? (
          <div className='note error-note'>
            {error}
          </div>
        ) : (
          <div className='note success-note'>
            <strong>You Domain is verified & Connected Successfully</strong>
          </div>
        )
      }
    </div>
  );
};

const DomainConnectInstruction = () => (
  <div className='flex-container flex-start'>
    <p className='note general-note'>
      To connect your domain, you need to log in to your Domain Name Provider Account(Domain.com, GoDaddy, Namecheap, ...etc)
      <br />
      And change your settings to match the Following:
      <br />
      <ul className='margin-top-20'>
        <li>
          Point your CNAME (www) to
          {' '}
          <code>cart.leadcart.io</code>
          <CopyIcon text='cart.leadcart.io' />
          {' '}
        </li>
        <li>
          Point your A RECORD (@) to
          {' '}
          <code>3.136.95.204</code>
          <CopyIcon text='3.136.95.204' />
          {' '}
        </li>
      </ul>
      <div className='note'>
        If you just want to use a CNAME to Point to your market place make sure its pointing to
        {' '}
        <code>cart.leadcart.io</code>
        <CopyIcon text='cart.leadcart.io' />
      </div>
      <div>
        Follow the step-by-step instructions &nbsp;
        <a href='https://help.leadcart.io/domains/connect' target='_blank'>
          here
        </a>
        &nbsp; if you have any problem.
      </div>
    </p>
  </div>
);
const DomainSetting = ({
  updateMarketPlaceDomains,
  customDomain
}) => {
  const [error, setError] = useState({});
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [records, setRecords] = useState([]);

  const onChange = ({ target: { value } }) => {
    setDomain(value);
    setError({});
    setConnected(false);
  };

  const onUpdate = () => {
    setLoading(true);
    updateMarketPlaceDomains(
      {
        domain
      },
      {
        onSuccess: (data) => {
          setRecords(data.records);
          setConnected(true);

          setLoading(false);
        },
        onFailed: (err) => {
          let error = {};
          if (typeof err === 'string') error.message = err;
          else error = err;
          setError(error);
          setLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    setDomain(customDomain);
    return () => {
      setError({});
      setConnected();
    };
  }, [customDomain]);

  return (
    <MainBlock title='MarketPlace Domain Settings' className='domains-setting-block'>
      <strong className='title '>
        Connect Your Custom domain
      </strong>
      <DomainConnectInstruction />
      <InputRow margin='20'>
        <InputRow.Label
          notes='Enter the domain you want to connect.'
        >
          Custom Domain Name:
        </InputRow.Label>
        <InputRow.TextField
          name='customDomain'
          onChange={onChange}
          placeholder='e.g. example.com'
          error={error.message}
          value={domain}
        />
        <Button
          disabled={loading}
          onprogress={loading}
          onClick={onUpdate}
          className='margin-left-30 primary-color'
        >
          Verify & Connect
        </Button>
      </InputRow>
      <VerificationProcess
        verifying={loading}
        error={error.message}
        recorder={records}
        connected={connected}
      />
    </MainBlock>
  );
};
//

DomainSetting.propTypes = {

};

const mapStateToProps = ({
  settings: {
    generalModel: {
      subdomain,
      customDomain
    } = {}
  } = {}
}) => ({
  subdomain,
  customDomain
});

export default connect(
  mapStateToProps,
  settingsActions
)(DomainSetting);
