import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import { connect } from 'react-redux';
import * as settingsActions from 'actions/settings';

const {
    InputRow,
    // MainBlock,
    Button,
    // MiniButton
} = common;


const DomainForm = ({ domains, connectMarketPlaceDomain }) => {
    const [value, setValue] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const haveDomains = domains.length;

    const onChange = ({ target: { value } }) => {
        setValue(value);
    };


    const onConnect = () => {
        setLoading(true);
        connectMarketPlaceDomain(
            {
                domain: value
            },
            {
                onSuccess: (data) => {
                    setLoading(false);
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
        </Fragment>
    );
};

DomainForm.propTypes = {

};


export default connect(null, settingsActions)(DomainForm);
