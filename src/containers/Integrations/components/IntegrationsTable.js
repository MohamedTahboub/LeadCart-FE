import React from 'react';
import clx from 'classnames';
import PropTypes from 'prop-types';
import ReactTip from 'react-tooltip';

import common from 'components/common';
import Table from 'components/common/Tables';

const { Button } = common;
const { Body, Row, Cell } = Table;

const defaultDescription = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste accusamus maiores quam reiciendis!';
const IntegrationsTable = ({
  list,
  onConnect,
  onDisconnect
}) => {

  return (
    <Table className='integration-list-table'>
      <Body>
        {list.map((service) => {
          const {
            key,
            name = 'Untitled',
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
            <Row
              key={key}
              className='integration-table-row'
            >
              <Cell
                flex={false}
                data-tip={name}
                data-type='light'
                data-delay-show={300}
                mainContent={(
                  <img src={brandLogo} className='integrations-service-brand' alt={`${name} brand`} />
                )}
              />

              <Cell
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

              <Cell
                flex={false}

                mainContent={(
                  <Button
                    fallback-data='Disconnect'
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
            </Row>
          );
        })}
        <ReactTip />
      </Body>
    </Table>
  );
};

IntegrationsTable.propTypes = { list: PropTypes.arrayOf(PropTypes.object) };
IntegrationsTable.defaultProps = { list: [] };

export default IntegrationsTable;
