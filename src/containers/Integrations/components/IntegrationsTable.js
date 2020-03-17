import React, { Fragment, useState } from 'react';
import common from 'components/common';
import PropTypes from 'prop-types';
import Table from 'components/common/Tables';
// import { spawn } from 'child_process';
import clx from 'classnames';
import ReactTip from 'react-tooltip';

const {
  // Badge,
  // MiniButton,
  // FlexBox,
  // onConnect,
  Button
} = common;


const defaultDescription = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste accusamus maiores quam reiciendis!';
const IntegrationsTable = ({
  list,
  onConnect,
  onDisconnect,
  showHeader
}) => {
  const [toggleBtn, setToggleBtn] = useState(false);


  return (
    <Table className='integration-list-table'>
      <Table.Body>
        {list.map((service, orderInList) => {
          const {
            key,
            name = 'Untitled',
            // label = name,
            connected,
            brandLogo,
            active,
            description = defaultDescription
          } = service;

          const connectLabel = active ? connected ? 'connected' : 'disconnected' : 'connect';
          const connectAction = connected ? onDisconnect : onConnect;

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
              // orderInList={orderInList}
              className='integration-table-row'
            >
              <Table.Cell
                flex={false}
                data-tip={name}
                data-type='light'
                data-delay-show={300}
                mainContent={(
                  <img src={brandLogo} className='integrations-service-brand' alt={`${name} brand`} />
                )}
                // subContent={name}
              />

              <Table.Cell
                flex
                flexStart
                className='padding-h-20'
                mainContent={
                  (
                    <span className='integration-service-description truncate'>
                      {description}
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
        <ReactTip />
      </Table.Body>
    </Table>
  );
};
/*
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

*/
IntegrationsTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
};
IntegrationsTable.defaultProps = {
  list: []
};

export default IntegrationsTable;
