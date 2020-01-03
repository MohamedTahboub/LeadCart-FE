import React, { useState, Fragment, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as settingsActions from 'actions/settings';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import common from 'components/common';

const getMessage = (err = '') => (err.includes('queryCname')
  ? 'This domain does not seems to be exist,Please check you domain and try again'
  : err);

const CopyIcon = ({ text }) => (
  <CopyToClipboard text={text}>
    <span className='copy-icon'>
      <i className='fas fa-copy' />
    </span>
  </CopyToClipboard>
);

const initialInstructions = (
  <div className='flex-container flex-start'>
    <p className='note general-note'>
      Now Setup Your Domain Records to Match The Following:
      <br />
      <ul className='margin-top-20'>
        <li>
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
      <div>
        Follow the step-by-step instructions &nbsp;
        <a href='https://help.leadcart.io/domains/connect' target='_blank' rel='noopener noreferrer'>
          here
        </a>
        &nbsp; if you have any issue.
      </div>
    </p>
  </div>
);
const DomainConnectInstruction = ({ result = {} }) => {
  const {
    success,
    message,
    records = {}
  } = result;

  const leadCartA = '3.136.95.204';
  const leadCartCNAME = 'cart.leadcart.io';


  const ARecord = Array.isArray(records.A) && (
    records.A.includes(leadCartA)
      ? (
        <li>
          Your A RECORD (@) Points Correctly to &nbsp;
          <code>
            {leadCartA}
            <CopyIcon text={leadCartA} />
          </code>
        </li>
      )
      : (
        <li>
          Your A RECORD (@) Does Not Points Correctly to &nbsp;
          <code>
            {leadCartA}
            <CopyIcon text={leadCartA} />
          </code>
          <br />
          instead its points to the following :
          <ul>
            {records.A.map((record) => <li>{record}</li>)}
          </ul>
        </li>
      )
  );

  const CNameRecord = Array.isArray(records.CNAME) && (
    records.CNAME.includes(leadCartCNAME)
      ? (
        <li>
          Your CNAME(www) Points Correctly to &nbsp;
          <code>
            {leadCartCNAME}
            <CopyIcon text={leadCartCNAME} />
          </code>
        </li>
      )
      : (
        <li>
          Your CNAME(www) Does Not Points Correctly to &nbsp;
          <code>
            {leadCartCNAME}
            <CopyIcon text={leadCartCNAME} />
          </code>
          <br />
          instead its points to the following :
          <ul>
            {records.CNAME.map((record) => <li>{record}</li>)}
          </ul>
        </li>
      )
  );

  return (
    <div className='flex-container flex-start'>
      <p className={`note ${success ? 'general-note' : 'error-note'}`}>
        {getMessage(message)}
        <br />
        {
          (ARecord || CNameRecord) && (
            <ul className='margin-top-20'>
              {ARecord}
              {CNameRecord}
            </ul>
          )
        }
      </p>
    </div>
  );
};
const {
  //   InputRow,
  //   MainBlock,
  Button,
  MiniButton
} = common;

const DomainsTable = ({
  domains,
  verifyMarketPlaceDomain,
  toggleMarketPlaceDomainConnection,
  deleteMarketPlaceDomain
}) => {
  const [loading, setLoading] = useState({});
  const [haveVerificationResults, setVerificationResult] = useState();

  const onVerify = (domain) => () => {
    setLoading({ verify: true });
    verifyMarketPlaceDomain({
      domain
    }, {
      onSuccess: (data) => {
        setVerificationResult({
          success: true,
          ...data
        });
        setLoading({ verify: false });
      },
      onFailed: (error) => {
        const message = typeof error === 'string' ? error : error.message;
        setVerificationResult({
          success: false,
          message,
          ...error
        });
        setLoading({ verify: false });
      }
    });
  };

  const onToggleState = (domain) => () => {
    setLoading({ connect: true });
    toggleMarketPlaceDomainConnection({
      domain
    }, {
      onSuccess: () => {
        setLoading({ connect: false });
      },
      onFailed: (error) => {
        setLoading({ connect: false });
      }
    });
  };
  const onDelete = (domain) => () => {
    setLoading({ delete: true });
    deleteMarketPlaceDomain({
      domain
    }, {
      onSuccess: () => {
        setLoading({ delete: false });
      },
      onFailed: (error) => {
        // console.log(error);
        setLoading({ delete: false });
      }
    });
  };

  useEffect(() => {
    setVerificationResult();
  }, [domains]);

  if (!domains.length) return null;
  return (
    <Fragment>
      {initialInstructions}
      <table className='domain-table'>
        <tr className='domain-table-row'>
          <th>Domain</th>
          <th>Primary</th>
          <th>Checks</th>
          <th>Delete</th>
        </tr>
        {domains.map(({
          domain,
          connected,
          verified
        }) => (
          <tr key={domain} className='domain-table-row'>
            <td>
              <code>{domain}</code>
            </td>
            <td>
              <Button
                disabled={loading.connect}
                onprogress={loading.connect}
                onClick={onToggleState(domain)}
                className={`${connected ? 'warning-color' : 'primary-color'}`}
              >
                {`${connected ? 'Disconnect' : 'Connect'}`}
              </Button>
            </td>
            <td>
              {!verified ? (
                <Button
                  className='primary-color'
                  disabled={loading.verify}
                  onprogress={loading.verify}
                  onClick={onVerify(domain)}
                >
                  {`${verified ? 'verified' : 'verify'}`}
                </Button>
              ) : (
                <div className='verified-badge'>
                  <i className='fas fa-check-circle' />
                  <span>
                        Verified
                  </span>
                </div>
              )}
            </td>
            <td>
              <MiniButton
                toolTip='Delete'
                className='domain-delete-btn'
                iconClass='fa-trash'
                disabled={loading.delete}
                onprogress={loading.delete}
                onClick={onDelete(domain)}
              />
            </td>
          </tr>
        ))}
      </table>
      {haveVerificationResults && (
        <DomainConnectInstruction
          result={haveVerificationResults}
        />
      )}
    </Fragment>
  );
};

DomainsTable.propTypes = {

};

export default connect(null, settingsActions)(DomainsTable);
