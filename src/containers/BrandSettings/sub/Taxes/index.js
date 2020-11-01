import React from 'react';

import common from 'components/common';
import TaxesManagement from './TaxesManagement';
import TaxZones from './TaxZones';
const { Tabs, Tab } = common;


const Taxes = ({ history }) => {
  return (
    <Tabs active='taxesZones' >
      <Tab id='taxesManagement' title='Taxes Management'>
        <TaxesManagement history={history} />
      </Tab>

      <Tab id='taxesZones' title='Taxes Zones'>
        <TaxZones />
      </Tab>
    </Tabs>
  );
};

export default Taxes;
