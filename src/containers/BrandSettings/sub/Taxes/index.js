import React from 'react';

import common from 'components/common';
import TaxesManagement from './TaxesManagement';
const { Tabs, Tab } = common;


const Taxes = () => {
  return (
    <Tabs active='taxesManagement' >
      <Tab id='taxesManagement' title='Taxes Management'>
        <TaxesManagement />
      </Tab>


      <Tab id='taxesZones' title='Taxes Zones'>
        Taxes Zones
      </Tab>
    </Tabs>
  );
};

export default Taxes;
