import React from 'react'
import PropTypes from 'prop-types'
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

    const onVerify = (domain) => () => { }
    const onToggleState = (domain) => () => { }
    const onDelete = (domain) => () => { }

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
                                onClick={onToggleState(domain)}
                                className='primary-color'
                            >
                                {`${connected ? 'Disconnect' : 'Connect'}`}
                            </Button>
                        </td>
                        <td>
                            <Button
                                className='primary-color'
                                disabled={verified}
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
                                onClick={onDelete(domain)}
                            />
                        </td>
                    </tr>
                )
            )}
        </table>
    )
}

DomainsTable.propTypes = {

}

export default connect(null,settingsActions)(DomainsTable);
