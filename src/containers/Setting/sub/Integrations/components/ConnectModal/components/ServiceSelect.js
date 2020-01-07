import React, { useState } from 'react';
import PropTypes from 'prop-types';

import common from 'components/common';
import ServiceCard from './ServiceCard';


import { servicesList } from '../..';

const {
  MainTitle,
  Button,
  InputRow,
  Currency,
  Tabs,
  Card,
  CardsContainer,
  Step
} = common;

const ServiceSelect = (props) => {
  const [activeLayout, setActiveLayout] = useState('list');
  const onSelect = () => {
  };


  return (
    <div className='integration-connect-section'>
      <div>
        <InputRow.TextField
          className='words-search-field integration-services-search'
          //   onChange={onSelect}
          prefix={<Currency value={<i className='fas fa-search' />} />}
          // value={filterKeys.searchKey}
          placeholder='Search By Service Name/Category'
          name='service'
        />
        <CardsContainer>
          {servicesList.map((service) => (
            <ServiceCard key={service.key} {...service} />
          ))}
        </CardsContainer>
      </div>
    </div>
  );
};


export default ServiceSelect;

