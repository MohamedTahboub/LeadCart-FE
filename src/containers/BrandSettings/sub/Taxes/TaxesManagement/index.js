import React, { Fragment, useState } from 'react';
import clx from 'classnames';
import { connect } from 'react-redux';

import common from 'components/common';
import { notification } from 'libs';
import * as taxesActions from 'actions/taxes';
import { isNewObjHasChange } from 'helpers/common';
import { DeleteModal } from '../components';
import Expandable from './Expandable';
import ControlButtons from './ControlButtons';

import './style.css';

const { Table, FlexBox, Button, Badge } = common;
const { Head, HeadCell, Body, Row, Cell } = Table;

const defaultTax = {
  name: 'New Tax',
  appliesTo: 'Subtotal',
  zoneDefinition: 'IPAddress',
  ratesPerZone: [
    {
      zone: '5f9832cf9b9fd77d030af88c',
      rate: 0
    }
  ]
};

const TaxesManagement = ({ taxes, addNewTax, editTax, history }) => {
  const [savedTaxData, setSavedTaxData] = useState({});
  const [fields, setFields] = useState({});
  const [editableTaxId, setEditableTaxId] = useState('');
  const [deleteTaxId, setDeleteTaxId] = useState('');
  const [cancelModalOpened, setCancelModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [commentedEditableTax, setCommentedEditableTax] = useState('');

  const onChange = ({ target: { value, name } }) => setFields({ ...fields, [name]: value });
  const taxHasChanges = isNewObjHasChange(savedTaxData, fields);


  const autoOpenEditMode = (data) => {
    setEditableTaxId(data._id);
    const newObj = { ...data };
    delete newObj._id;
    delete newObj?.brand;
    delete newObj?.createdAt;
    delete newObj?.updatedAt;
    delete newObj?.__v;
    setFields(newObj);
    setSavedTaxData(newObj);
  };

  const onAddNewtax = () => {

    setLoading(true);
    addNewTax(
      defaultTax,
      {
        onSuccess: (data) => {
          setLoading(false);
          autoOpenEditMode(data);
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

          if (inTheSameExpandable)
            setEditableTaxId('');
          else
            autoOpenEditMode(commentedEditableTax);

          notification.success('You Change edited successfuly');
        },
        onFailed: (message) => {
          setSaveLoading(false);
          notification.failed(message);
        }
      }
    );
  };


  const onEditTax = ({ name, appliesTo, zoneDefinition, ratesPerZone, otherZonesRate = 0, enabled, zone, _id }) => () => {
    const editableData = { name, appliesTo, zoneDefinition, ratesPerZone, otherZonesRate, enabled, zone };
    setCommentedEditableTax({ name, appliesTo, zoneDefinition, ratesPerZone, enabled, otherZonesRate, zone, _id });
    if (taxHasChanges) {
      setCancelModalOpened(true);
    } else {
      setEditableTaxId(_id);
      setSavedTaxData(editableData);
      setFields(editableData);
    }
  };


  const onConfirmCancelEdits = () => {
    if (taxHasChanges)
      setCancelModalOpened(true);
    else
      setEditableTaxId('');
  };

  const onCancelEdits = () => {
    const inTheSameExpandable = commentedEditableTax._id === editableTaxId;
    setFields(savedTaxData);
    setCancelModalOpened(false);

    if (inTheSameExpandable) {
      setEditableTaxId('');
    } else {
      const targetedOffset = document.getElementById(commentedEditableTax?._id).offsetTop;
      commentedEditableTax?._id && history.push(`/settings/taxes#${commentedEditableTax?._id}`);
      commentedEditableTax?._id && window.scrollTo({ top: targetedOffset, behavior: 'smooth' });
      setEditableTaxId(commentedEditableTax._id);
    }
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

  const valueToLabel = {
    Subtotal: 'Subtotal',
    SubtotalAndShipping: 'Subtotal And Shipping',
    ShippingDetails: 'Shipping Details',
    BillingDetails: 'Billing Details',
    IPAddress: 'IP Address'
  };

  const ExpandableProps = {
    onSave,
    onConfirmCancelEdits,
    saveLoading,
    setEditableTaxId,
    onChange,
    fields,
    savedTaxData,
    onCloseCancelModal,
    cancelModalOpened,
    onCancelEdits,
    editableTaxId
  };


  return (
    <FlexBox className='taxes-container' column>
      <FlexBox spaceBetween className='my-2'>
        <FlexBox column className='gray-text pl-3 m-0 small-text'>
          Manual tax rates are configured by you depending on destination and products sold, You fully control the calculation of your taxes.
          <br />
          set up taxes per customer location (country, state, zip/postal code), add tax per group of products, set up tax-free products.
        </FlexBox>

        <FlexBox className='v-center'>
          <Button className='primary-color' onClick={onAddNewtax} disabled={loading} onprogress={loading} >Add new Tax Schema</Button>
        </FlexBox>
      </FlexBox>

      <Table className='taxes-table mt-4'>
        <Head>
          <HeadCell>Tax Name</HeadCell>
          <HeadCell>Tax Applies to</HeadCell>
          <HeadCell>Zone Defines By</HeadCell>
          {/*<HeadCell>Rates per zone</HeadCell>*/}
          <HeadCell>state</HeadCell>
          <HeadCell>Control</HeadCell>
        </Head>

        <Body>
          {taxes.map((tax) => {
            const { name, appliesTo, zoneDefinition, ratesPerZone, enabled, _id } = tax;
            const isEditableTax = editableTaxId === _id;
            const controlButtonsProps = { isEditableTax, onDeleteTax, editableTaxId, taxHasChanges, onEditTax, tax, onConfirmCancelEdits, _id, saveLoading, onSave };

            return (
              <Fragment key={_id}>
                <Row className={clx('taxes-table-row', { open: isEditableTax })} id={_id}>
                  <Cell>{name}</Cell>
                  <Cell>{valueToLabel[appliesTo]}</Cell>
                  <Cell>{valueToLabel[zoneDefinition]}</Cell>
                  {/* <Cell>{ratesPerZone}</Cell> */}
                  {/*<Cell>ratesPerZone</Cell>*/}
                  <Cell>{getTaxState(enabled)}</Cell>
                  <Cell>
                    <ControlButtons {...controlButtonsProps} />
                  </Cell>
                </Row>
                <Expandable
                  open={isEditableTax}
                  taxId={_id}
                  {...ExpandableProps}
                />
              </Fragment>
            );
          })}
        </Body>
      </Table>

      <DeleteModal taxId={deleteTaxId} onClose={onCancelDeleteTax} isVisible={deleteModalOpend} type='tax' />
    </FlexBox>
  );
};

const mapStateToProps = ({ taxes }) => ({ taxes });

export default connect(mapStateToProps, taxesActions)(TaxesManagement);
