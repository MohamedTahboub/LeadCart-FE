import React from 'react';
import PropTypes from 'prop-types';

import common from 'components/common';
import Item from './Item';

const { FlexBox } = common;

const IntegrationsGrid = ({
  list,
  ...props
}) => (
  <FlexBox wrappable baseline>
    {list.map((service) => (
      <Item
        key={service.integrationKey}
        service={service}
        {...props}
        {...service}
        cardType='card'
      />
    ))}
  </FlexBox>);

IntegrationsGrid.propTypes = { list: PropTypes.arrayOf(PropTypes.object) };
IntegrationsGrid.defaultProps = { list: [] };

export default IntegrationsGrid;
