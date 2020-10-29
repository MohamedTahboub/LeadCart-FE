import React, { Fragment, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import clx from 'classnames';
import { connect } from 'react-redux';

import common from 'components/common';
import { notification } from 'libs';
import * as taxesActions from 'actions/taxes';
import { CancelModal, DeleteModal, Expandable } from './components';
import { isFunnelBuilderChanged } from 'helpers/common';

import './style.css';

const { Table, FlexBox, Title, Button, Badge } = common;
const { Head, HeadCell, Body, Row, Cell } = Table;

const TaxesManagement = ({ taxes, addNewTax, editTax }) => {
  const [savedTaxData, setSavedTaxData] = useState({});
  const [fields, setFields] = useState({});
  const [editableTaxId, setEditableTaxId] = useState('');
  const [deleteTaxId, setDeleteTaxId] = useState('');
  const [cancelModalOpened, setCancelModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [commentedEditableTax, setCommentedEditableTax] = useState('');


  const onChange = ({ target: { value, name } }) => setFields({ ...fields, [name]: value });

  const onAddNewtax = () => {
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


  const onSave = () => {
    const inTheSameExpandable = commentedEditableTax._id === editableTaxId;

    setSaveLoading(true);

    editTax(
      { tax: editableTaxId, details: fields },
      {
        onSuccess: () => {
          setSaveLoading(false);
          setSavedTaxData(fields);
          if (cancelModalOpened) setCancelModalOpened(false);

          if (inTheSameExpandable) {
            setEditableTaxId('');
          } else {
            setEditableTaxId(commentedEditableTax._id);
            const newObj = { ...commentedEditableTax };
            delete newObj._id;
            setFields(newObj);
          }

          notification.success('You Change edited successfuly successfuly');
        },
        onFailed: (message) => {
          setSaveLoading(false);
          notification.failed(message);
        }
      }
    );
  };


  const onEditTax = ({ name, appliesTo, zoneDefinition, ratesPerZone, enabled, zone, _id }) => () => {
    const hasChanges = isFunnelBuilderChanged(savedTaxData, fields);
    const editableData = { name, appliesTo, zoneDefinition, ratesPerZone, enabled, zone };
    setCommentedEditableTax({ name, appliesTo, zoneDefinition, ratesPerZone, enabled, zone, _id });

    if (hasChanges) {
      setCancelModalOpened(true);
    } else {
      setEditableTaxId(_id);
      setSavedTaxData(editableData);
      setFields(editableData);
    }
  };


  const onConfirmCancelEdits = () => {
    const hasChanges = isFunnelBuilderChanged(savedTaxData, fields);

    if (hasChanges)
      setCancelModalOpened(true);
    else
      setEditableTaxId('');
  };

  const onCancelEdits = () => {
    const inTheSameExpandable = commentedEditableTax._id === editableTaxId;
    setFields(savedTaxData);
    setCancelModalOpened(false);

    if (inTheSameExpandable)
      setEditableTaxId('');
    else
      setEditableTaxId(commentedEditableTax._id);
  };


  const onDeleteTax = (taxId) => () => setDeleteTaxId(taxId);
  const onCancelDeleteTax = () => setDeleteTaxId('');
  const onCloseCancelModal = () => setCancelModalOpened(false);


  const getTaxState = (enabled) => (
    <Badge type={enabled ? 'primary' : 'secondary'}>
      {enabled ? 'Enabled' : 'Disabled'}
    </Badge>
  );

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
            const { name, appliesTo, zoneDefinition, ratesPerZone, enabled, _id } = tax;
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

                      <FaRegEdit size={20} className='tax-edit-icon ml-3' onClick={onEditTax(tax)} />
                    </FlexBox>
                  </Cell>
                </Row>
                <Expandable
                  open={isEditableTax}
                  onSave={onSave}
                  onConfirmCancelEdits={onConfirmCancelEdits}
                  taxId={_id}
                  saveLoading={saveLoading}
                  setEditableTaxId={setEditableTaxId}
                  onChange={onChange}
                  fields={fields}
                  savedTaxData={savedTaxData}
                />
              </Fragment>
            );
          })}
        </Body>
      </Table>

      <DeleteModal taxId={deleteTaxId} onClose={onCancelDeleteTax} isVisible={deleteModalOpend} />
      <CancelModal
        onSave={onSave}
        onClose={onCloseCancelModal}
        isVisible={cancelModalOpened}
        onCancelEdits={onCancelEdits}
        saveLoading={saveLoading}
      />
    </FlexBox>
  );
};

const mapStateToProps = ({ taxes }) => ({ taxes });

export default connect(mapStateToProps, taxesActions)(TaxesManagement);
