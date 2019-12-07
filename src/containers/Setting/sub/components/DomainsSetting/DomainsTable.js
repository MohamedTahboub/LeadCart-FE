import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as settingsActions from 'actions/settings';

import common from 'components/common';
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

  const onVerify = (domain) => () => {
    setLoading({ verify: true });
    verifyMarketPlaceDomain({
      domain
    }, {
      onSuccess: () => {
        setLoading({ verify: false });
      },
      onFailed: (error) => {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        setLoading({ delete: false });
      }
    });
  };

  if (!domains.length) return null;
  return (
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
              className='primary-color'
            >
              {`${connected ? 'Disconnect' : 'Connect'}`}
            </Button>
          </td>
          <td>
            <Button
              className='primary-color'
              disabled={loading.verify}
              onprogress={loading.verify}
              onClick={onVerify(domain)}
            >
              {`${verified ? 'verified' : 'verify'}`}
            </Button>
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
  );
};

DomainsTable.propTypes = {

};

export default connect(null, settingsActions)(DomainsTable);
