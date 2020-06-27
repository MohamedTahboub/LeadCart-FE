import React from 'react';

import common from 'components/common';
import ServiceCard from './ServiceCard';
import { servicesList } from '../..';

const {
  InputRow,
  Currency,
  CardsContainer
} = common;

const ServiceSelect = ({ onSelect, ...props }) =>
  (
    <div className='integration-connect-section'>
      <div>
        <InputRow.TextField
          className='words-search-field integration-services-search'
          prefix={<Currency value={<i className='fas fa-search' />} />}
          placeholder='Search By Service Name/Category'
          name='service'
        />
        <CardsContainer>
          {servicesList.map((service) => (
            <ServiceCard
              key={service.key}
              onClick={onSelect(service)}
              {...service}
            />
          ))}
        </CardsContainer>
      </div>
    </div>
  );

export default ServiceSelect;

