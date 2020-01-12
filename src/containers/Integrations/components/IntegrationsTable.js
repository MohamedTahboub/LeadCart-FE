import React, { Fragment, useState } from 'react';
import common from 'components/common';
import PropTypes from 'prop-types';
import Table from 'components/common/Tables';
// import { spawn } from 'child_process';
import clx from 'classnames';

const {
  Badge,
  MiniButton,
  // onConnect,
  Button
} = common;

const IntegrationsTable = ({
  list,
  onConnect,
  onDisconnect,
  showHeader
}) => {
  const [toggleBtn, setToggleBtn] = useState(false);


  return (
    <Table>
      {showHeader && (
        <Table.Head>
          <Table.HeadCell
            className='integration-head-cell'
            flex={false}
          >
            Service Name
          </Table.HeadCell>
          <Table.HeadCell flex />
          <Table.HeadCell
            className='integration-head-cell'
            flex={false}
          >
            Status
          </Table.HeadCell>
        </Table.Head>
      )}
      <Table.Body>
        {list.map((service, orderInList) => {
          const {
            key,
            name = 'Untitled',
            // label = name,
            connected,
            brandLogo,
            active
          } = service;

          const connectLabel = active ? connected ? 'connected' : 'disconnected' : 'connect';
          const connectAction = active ? connected ? onDisconnect : undefined : onConnect;

          const connectBtnClasses = clx({
            'integration-toggle-btn': true,
            'uppercase-text': true,
            'primary-color': connected,
            'danger-btn': !connected && active,
            'gray-btn': !active
          });

          return (
            <Table.Row

              key={key}
              orderInList={orderInList}
              className='integration-table-row'
            >
              <Table.Cell
                flex={false}

                mainContent={(
                  <img src={brandLogo} className='integrations-service-brand' alt={`${name} brand`} />
                )}
                subContent={name}
              />

              <Table.Cell
                flex
                mainContent={
                  (
                    <span className='integration-service-description'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste accusamus maiores quam reiciendis!
                    </span>
                  )
                }
              />
              <Table.Cell
                flex={false}

                mainContent={(
                  <Button
                    fallback-data='Disconnect'
                    // type={active ? 'primary' : 'secondary'}
                    className={connectBtnClasses}
                    onClick={() => connectAction(service)}
                    onHoverProps={connected ? {
                      children: 'Disconnect',
                      className: `${connectBtnClasses} danger-btn`
                    }
                      : {}}
                  >
                    {connectLabel}
                  </Button>
                )}
              />
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

IntegrationsTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
};
IntegrationsTable.defaultProps = {
  list: []
};

export default IntegrationsTable;
