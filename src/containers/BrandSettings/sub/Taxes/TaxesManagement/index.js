import React, { Fragment, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import clx from 'classnames';
import { connect } from 'react-redux';

import common from 'components/common';
import { notification } from 'libs';
import * as taxesActions from 'actions/taxes';
import { CancelModal, DeleteModal, Expandable } from './components';

import './style.css';

const { Table, FlexBox, Title, Button, Badge } = common;
const { Head, HeadCell, Body, Row, Cell } = Table;

const TaxesManagement = ({ taxes, addNewTax, editTax }) => {
  const [editableTaxId, setEditableTaxId] = useState('');
  const [deleteTaxId, setDeleteTaxId] = useState('');
  const [cancelModalOpened, setCancelModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const defaultTax = {
    name: 'New Tax',
    appliesTo: 'Subtotal',
    zoneDefinition: 'IPAddress',
    ratesPerZone: [
      {
        zone: '5f9832cf9b9fd77d030af889',
        rate: 0
      }
    ]
  };


  const onAddNewtax = () => {
    setLoading(true);
    addNewTax(
      defaultTax,
      {
        onSuccess: () => {
          setLoading(false);
          notification.success('New tax added successfuly');
        },
        onFailed: (message) => {
          setLoading(false);
          notification.failed(message);
        }
      }
    );
  };


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


  const onSave = (taxId, details) => () => {
    setSaveLoading(true);

    editTax(
      { tax: taxId, details },
      {
        onSuccess: () => {
          setSaveLoading(false);
          setEditableTaxId('');
          cancelModalOpened && setCancelModalOpened(false);
          notification.success('You Change edited successfuly successfuly');
        },
        onFailed: (message) => {
          setSaveLoading(false);
          notification.failed(message);
        }
      }
    );
  };


  const deleteModalOpend = Boolean(deleteTaxId);

  return (
    <FlexBox className='taxes-container' column>
      <FlexBox spaceBetween className='my-2'>
        <Title>Taxes Management</Title>
        <Button className='primary-color' onClick={onAddNewtax} disabled={loading} onprogress={loading} >Add new Tax Schema</Button>
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
            const { name, appliesTo, zoneDefinition, ratesPerZone, enabled, _id, zone } = tax;
            const isEditableTax = editableTaxId === _id;
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
                <Expandable
                  open={isEditableTax}
                  onSave={onSave}
                  onCancelEdits={onCancelEdits}
                  name={name}
                  zone={zone}
                  appliesTo={appliesTo}
                  zoneDefinition={zoneDefinition}
                  ratesPerZone={ratesPerZone}
                  enabled={enabled}
                  taxId={_id}
                  saveLoading={saveLoading}
                  setEditableTaxId={setEditableTaxId}
                />
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

export default connect(mapStateToProps, taxesActions)(TaxesManagement);
