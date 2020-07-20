import React, { Fragment, useEffect, useState } from 'react';
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

const { InputRow, MainBlock, Button, MiniButton } = common;

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
      Now Setup Your Domain Records to Match The Following:
      <br />
      <ul>
        <li>
          If you are connecting a root domain (example.com) Please follow add those records:
          <ul className='margin-top-20'>
            <li>
              <br />
              Your CNAME(www) Points to
              <code>cart.leadcart.io</code>
              <CopyIcon text='cart.leadcart.io' />
            </li>
            <li>
              Your A RECORD (@) Points to
              <code>3.136.95.204</code>
              <CopyIcon text='3.136.95.204' />
            </li>
          </ul>
        </li>
        <li>
          If you are connecting a sub-domain domain (pay.example.com) Please follow add those records:
          <ul className='margin-top-20'>
            <li>
              <br />
              Your CNAME(www) Points to
              <code>cart.leadcart.io</code>
              <CopyIcon text='cart.leadcart.io' />
            </li>
          </ul>
        </li>
      </ul>

      <div>
        Follow the step-by-step instructions &nbsp;
        <a href='intercom.help/leadcart' target='_blank'>
          here
        </a>
        &nbsp; if you have any issue.
      </div>
    </p>
  </div>
);
const DomainSetting = ({
  connectMarketPlaceDomain,
  customDomain
}) => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({ domain: customDomain, connected: !!customDomain });

  const onChange = ({ target: { value } }) => {
    setFields({ domain: value });
    setError({});
  };

  const onConnect = () => {
    setLoading(true);
    connectMarketPlaceDomain(
      { domain: fields.domain },
      {
        onSuccess: (data) => {
          setFields({
            domain: fields.domain,
            connected: true
          });
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

  const onVerify = () => {
    setLoading(true);
    connectMarketPlaceDomain(
      { domain: fields.domain },
      {
        onSuccess: (data) => {
          // setRecords(data.records);
          // setConnected(true);

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


  const onDomainDelete = () => {

  };

  useEffect(
    () => () => {
      setError({});
    // setConnected();
    },
    [customDomain]
  );

  return (
    <MainBlock title='MarketPlace Domain Settings' className='domains-setting-block'>
      {!fields.connected && (
        <Fragment>
          <strong className='title '>
            Connect Your Custom domain
          </strong>
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
              value={fields.domain}
            />
            <Button
              disabled={loading}
              onprogress={loading}
              onClick={onConnect}
              className='margin-left-30 primary-color'
            >
              Connect
            </Button>
          </InputRow>
        </Fragment>
      )}

      {fields.connected && (
        <table className='domain-table'>
          <tr className='domain-table-row'>
            <th>Domain</th>
            <th>Primary</th>
            <th>Checks</th>
            <th>Delete</th>
          </tr>
          <tr className='domain-table-row'>
            <td>
              <code>{fields.domain}</code>
            </td>
            <td>
              <Button className='primary-color'>
                {`${fields.connected ? 'Disconnect' : 'Connect'}`}
              </Button>
            </td>
            <td>
              <Button className='primary-color' disabled={fields.verified}>
                {`${fields.verified ? 'verified' : 'verify'}`}
              </Button>
            </td>
            <td>
              <MiniButton
                toolTip='Delete'
                className='domain-delete-btn'
                iconClass='fa-trash'
                onClick={onDomainDelete}
              />
            </td>
          </tr>
        </table>
      )}
      <DomainConnectInstruction connected={fields.connected} />


    </MainBlock>
  );
};
//

/*

 <VerificationProcess
        verifying={loading}
        error={error.message}
        recorder={records}
        connected={connected}
      />
*/

DomainSetting.propTypes = {};

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
