import React from 'react';
import { connect } from 'react-redux';
import common from 'components/common';


import './style.css';
import DomainForm from './DomainForm';
import DomainsTable from './DomainsTable';
import DomainRedirectSettings from './DomainRedirectSettings';

const { MainBlock, DisplayContent } = common;

const DomainsSettings = ({ domains, onChange, marketPlace }) => (
  <DisplayContent target='Premium'>
    <MainBlock title='MarketPlace Domain Settings' className='domains-setting-block' containerClasses='transparent-white-bg'>
      <DomainForm domains={domains} />
      <DomainsTable domains={domains} />
      <DomainRedirectSettings marketPlace={marketPlace} onChange={onChange}/>
    </MainBlock>
  </DisplayContent>
);

DomainsSettings.propTypes = {};


const mapStateToProps = ({ settings: { generalModel: { domains = [] } = {} } = {} }) => ({ domains });

export default connect(mapStateToProps)(DomainsSettings);

