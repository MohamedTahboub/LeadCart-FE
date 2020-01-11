import React, { Fragment } from 'react';
import common from 'components/common';
import PropTypes from 'prop-types';
import Table from 'components/common/Tables';

const {
  Badge,
  MiniButton
} = common;

const IntegrationsTable = ({ list }) => (
  <Table>
    <Table.Head>
      <Table.HeadCell>Label</Table.HeadCell>
      <Table.HeadCell>Service Name</Table.HeadCell>
      <Table.HeadCell />
      <Table.HeadCell />
      <Table.HeadCell>Status</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {list.map(({
        key,
        name = 'Untitled',
        label = name,
        connected,
        brandLogo,
        active
      }, orderInList) => (
        <Table.Row
          key={key}
          orderInList={orderInList}
          className='member-table-row'
        >

          <Table.Cell mainContent={label} />
          <Table.Cell mainContent={name} />

          <Table.Cell mainContent={(
            <img src={brandLogo} className='integrations-service-brand' alt={`${name} brand`} />
          )}
          />
          <Table.Cell>
            <Fragment>
              <MiniButton
                toolTip='Edit'
                className='table-row-edit-btn position-right-10'
                iconClass='fas fa-edit'
                // disabled={defaultLanguage}
                // onClick={() => onOpenEditModal(id)}
              />
            </Fragment>
          </Table.Cell>
          <Table.Cell mainContent={(
            <Badge type={active ? 'primary' : 'secondary'} className='uppercase-text'>
              {active ? connected ? 'Connected' : 'Disconnected' : 'connect'}
            </Badge>
          )}
          />
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

IntegrationsTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
};
IntegrationsTable.defaultProps = {
  list: []
};

export default IntegrationsTable;
