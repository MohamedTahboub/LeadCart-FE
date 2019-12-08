import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import common from 'components/common';


import './style.css'
import DomainForm from './DomainForm';
import DomainsTable from './DomainsTable';

const {
    // InputRow,
    MainBlock,
    // Button,
    // MiniButton
} = common;

const DomainsSettings = ({ domains }) => (
    <MainBlock title='MarketPlace Domain Settings' className='domains-setting-block'>
        <DomainForm domains={domains} />
        <DomainsTable domains={domains} />
    </MainBlock>
);

DomainsSettings.propTypes = {

};


const mapStateToProps = ({
    settings: {
        generalModel: {
            domains = []
        } = {}
    } = {}
}) => ({
    domains
});

export default connect(
    mapStateToProps,
)(DomainsSettings);

