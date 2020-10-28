import React, { Fragment, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import clx from 'classnames';
import { connect } from 'react-redux';

import common from 'components/common';
import { CancelModal, DeleteModal, Expandable } from './components';
import './style.css';

const { Table, FlexBox, Title, Button, Badge } = common;
const { Head, HeadCell, Body, Row, Cell } = Table;

const TaxesManagement = ({ taxes }) => {
  const [editableTaxId, setEditableTaxId] = useState('');
  const [deleteTaxId, setDeleteTaxId] = useState('');
  const [cancelModalOpened, setCancelModalOpened] = useState(false);

  const getTaxState = (enabled) => (
    <Badge type={enabled ? 'primary' : 'secondary'}>
      {enabled ? 'Enabled' : 'Disabled'}
    </Badge>
  );


  const onDeleteTax = (taxId) => () => setDeleteTaxId(taxId);
  const onCancelDeleteTax = () => setDeleteTaxId('');
  const onEditTax = (taxId) => () => setEditableTaxId(taxId);
  const onCancelEdits = () => setCancelModalOpened(true);
  const onCloseCancelModal = () => setCancelModalOpened(false);


  const onSave = () => {
    cancelModalOpened && setCancelModalOpened(false);
    setEditableTaxId('');
  };

  const deleteModalOpend = Boolean(deleteTaxId);

  return (
    <FlexBox className='taxes-container' column>
      <FlexBox spaceBetween className='my-2'>
        <Title>Taxes Management</Title>
        <Button className='primary-color' >Add new Tax Schema</Button>
      </FlexBox>

      <Table className='taxes-table mt-4'>
        <Head>
          <HeadCell>Tax Name</HeadCell>
          <HeadCell>Tax Applies to</HeadCell>
          <HeadCell>Zone Defines By</HeadCell>
          <HeadCell>Rates per zone</HeadCell>
          <HeadCell>state</HeadCell>
          <HeadCell>Control</HeadCell>
        </Head>

        <Body>
          {taxes.map((tax) => {
            const { name, appliesTo, zoneDefinition, ratesPerZone, enabled, _id } = tax;
            const isEditableTax = editableTaxId === tax._id;
            return (
              <Fragment>
                <Row className={clx('taxes-table-row', { open: isEditableTax })}>
                  <Cell>{name}</Cell>
                  <Cell>{appliesTo}</Cell>
                  <Cell>{zoneDefinition}</Cell>
                  {/* <Cell>{ratesPerZone}</Cell> */}
                  <Cell>ratesPerZone</Cell>
                  <Cell>{getTaxState(enabled)}</Cell>
                  <Cell>
                    <FlexBox>
                      <RiDeleteBin6Line size={20} className='tax-delete-icon' onClick={onDeleteTax(_id)} />

                      {isEditableTax ?
                        <ImCancelCircle size={20} className='tax-edit-icon ml-3' onClick={onCancelEdits} />
                        :
                        <FaRegEdit size={20} className='tax-edit-icon ml-3' onClick={onEditTax(_id)} />
                      }
                    </FlexBox>
                  </Cell>
                </Row>
                <Expandable open={isEditableTax} onSave={onSave} onCancelEdits={onCancelEdits} {...tax} />
              </Fragment>
            );
          })}
        </Body>
      </Table>

      <DeleteModal taxId={deleteTaxId} onClose={onCancelDeleteTax} isVisible={deleteModalOpend} />
      <CancelModal onSave={onSave} onClose={onCloseCancelModal} isVisible={cancelModalOpened} />
    </FlexBox>
  );
};

const mapStateToProps = ({ taxes }) => ({ taxes });

export default connect(mapStateToProps)(TaxesManagement);
