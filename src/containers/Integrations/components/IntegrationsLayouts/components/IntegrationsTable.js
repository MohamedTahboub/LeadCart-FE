import React from 'react';
import PropTypes from 'prop-types';
import ReactTip from 'react-tooltip';
import Table from 'components/common/Tables';
import Item from './Item';

const { Body } = Table;
const IntegrationsTable = ({
  list,
  ...props
}) => (
  <Table className='integration-list-table'>
    <Body>
      {
        list.map((service) => (
          <Item
            key={`${service.integrationKey}_#${service._id}`}
            {...props}
            {...service}
            service={service}
            cardType='row'
          />
        ))}
      <ReactTip />
    </Body>
  </Table>
);


IntegrationsTable.propTypes = { list: PropTypes.arrayOf(PropTypes.object) };
IntegrationsTable.defaultProps = { list: [] };

export default IntegrationsTable;
