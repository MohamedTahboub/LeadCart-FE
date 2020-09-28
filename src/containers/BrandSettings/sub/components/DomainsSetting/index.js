import React from 'react';
import { connect } from 'react-redux';
import common from 'components/common';


import './style.css';
import DomainForm from './DomainForm';
import DomainsTable from './DomainsTable';

const { MainBlock, DisplayContent } = common;

const DomainsSettings = ({ domains }) => (
  <DisplayContent target='Premium'>
    <MainBlock title='MarketPlace Domain Settings' className='domains-setting-block' containerClasses='transparent-white-bg'>
      <DomainForm domains={domains} />
      <DomainsTable domains={domains} />
    </MainBlock>
  </DisplayContent>
);

DomainsSettings.propTypes = {};


const mapStateToProps = ({ settings: { generalModel: { domains = [] } = {} } = {} }) => ({ domains });

export default connect(mapStateToProps)(DomainsSettings);

