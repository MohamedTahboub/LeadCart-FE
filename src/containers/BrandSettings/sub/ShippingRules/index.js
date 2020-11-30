import React, { Fragment, useState } from 'react';
import clx from 'classnames';
import { connect } from 'react-redux';
import ids from 'shortid';

import { notification } from 'libs';
import shippingRulesSchema from 'libs/validation/shippingRules';
import * as shippingRulesActions from 'actions/shippingRules';
import { getNewNameWithNumber, isNewObjHasChange } from 'helpers/common';
import common from 'components/common';
import Expandable from './Expandable';
import { ControlButtons, DeleteModal } from '../components/common';
import { fakeData } from './fakeData';

import './style.css';
import { RiNumbersFill } from 'react-icons/ri';

const { Table, FlexBox, Button, Badge } = common;
const { Head, HeadCell, Body, Row, Cell } = Table;


const ShippingRules = ({ history, editShippingRule, addNewShippingRule, destinationZones, shippingRules }) => {

  const [savedShippingRuleData, setSavedShippingRuleData] = useState({});
  const [fields, setFields] = useState({});
  const [editableShipingRuleId, setEditableShippingRuleId] = useState('');
  const [deleteShippingRuleId, setDeleteShippingRuleId] = useState('');
  const [cancelModalOpened, setCancelModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [commentedEditableShippingRule, setCommentedEditableShippingRule] = useState('');
  const [hasInvalidRate, setHasInvalidRate] = useState(false);
  const [clickedManageZones, setClickedManageZones] = useState(false);

  const onChange = ({ target: { value, name } }) => setFields({ ...fields, [name]: value });
  const shippingRuleHasChanges = isNewObjHasChange(savedShippingRuleData, fields);
  const autoOpenEditMode = async (data) => {
    const { value = {} } = await shippingRulesSchema(data);
    setEditableShippingRuleId(data._id);
    setFields(value);
    setSavedShippingRuleData(value);
  };

  const defaultShippingRule = (() => {
    return {
      name: `Shipping Method #${shippingRules.length + 1}`,
      enabled: true,
      rates: [
        {
          // _id: ids.generate(),
          from: 0,
          to: 0,
          cost: 0
        }
      ],
      // description: ''
    };
  })();


  const onAddNewShippingRule = () => {
    setLoading(true);
    addNewShippingRule(
      defaultShippingRule,
      {
        onSuccess: (data) => {
          setLoading(false);
          // autoOpenEditMode(data);
          notification.success('New Shipping Rule added successfuly');
        },
        onFailed: (message) => {
          setLoading(false);
          notification.failed(message);
        }
      }
    );
  };


  const onSave = async () => {
    setSaveLoading(true);
    const inTheSameExpandable = commentedEditableShippingRule._id === editableShipingRuleId;
    const { isValid, value, message } = await shippingRulesSchema(fields);

    if (isValid) {
      editShippingRule(
        { shippingMethod: editableShipingRuleId, details: value },
        {
          onSuccess: () => {
            setSaveLoading(false);
            setSavedShippingRuleData(fields);
            if (cancelModalOpened) setCancelModalOpened(false);

            if (clickedManageZones) {
              setClickedManageZones(false);
              history.push('/settings/zones');
            }

            if (inTheSameExpandable)
              setEditableShippingRuleId('');
            else
              autoOpenEditMode(commentedEditableShippingRule);

            notification.success('You Change edited successfuly');
          },
          onFailed: (message) => {
            setSaveLoading(false);
            notification.failed(message);
          }
        }
      );
    } else {
      notification.failed(message);
      setSaveLoading(false);
    }
  };


  const onEditShippingRule = (shippingRuleData = {}) => async () => {
    setCommentedEditableShippingRule(shippingRuleData);
    if (shippingRuleHasChanges) {
      setCancelModalOpened(true);
    } else {
      setEditableShippingRuleId(shippingRuleData._id);
      setSavedShippingRuleData(shippingRuleData);
      setFields(shippingRuleData);
    }
  };


  const onConfirmCancelEdits = () => {
    if (shippingRuleHasChanges)
      setCancelModalOpened(true);
    else
      setEditableShippingRuleId('');
  };


  const onCancelEdits = () => {
    const inTheSameExpandable = commentedEditableShippingRule._id === editableShipingRuleId;
    setFields(savedShippingRuleData);
    setCancelModalOpened(false);

    if (clickedManageZones) {
      setClickedManageZones(false);
      history.push('/settings/zones');
    }

    if (inTheSameExpandable)
      setEditableShippingRuleId('');
    else
      setEditableShippingRuleId(commentedEditableShippingRule._id);
  };


  const onDeleteShippingRule = (shippingRuleId) => () => setDeleteShippingRuleId(shippingRuleId);
  const onCancelDeleteShippingRule = () => setDeleteShippingRuleId('');
  const onCloseCancelModal = () => setCancelModalOpened(false);

  const getShippingRuleState = (enabled) => (
    <Badge type={enabled ? 'primary' : 'secondary'}>
      {enabled ? 'Enabled' : 'Disabled'}
    </Badge>
  );


  const onOpenZones = () => {
    if (shippingRuleHasChanges) {
      setCancelModalOpened(true);
      setClickedManageZones(true);
    } else {
      history.push('/settings/zones');
    }
  };


  const deleteModalOpend = Boolean(deleteShippingRuleId);

  const zoneOptions = [{ label: 'All Zones', value: undefined }].concat(destinationZones.map(({ name, _id }) => ({ value: _id, label: name })));


  const ExpandableProps = {
    onSave,
    onConfirmCancelEdits,
    saveLoading,
    setEditableShippingRuleId,
    onChange,
    fields,
    savedShippingRuleData,
    onCloseCancelModal,
    cancelModalOpened,
    onCancelEdits,
    editableShipingRuleId,
    setHasInvalidRate,
    hasInvalidRate,
    onOpenZones,
    zoneOptions
  };


  return (
    <FlexBox className='shipping-rules-container' column>
      <FlexBox flexEnd className='my-2'>
        <FlexBox className='v-center'>
          <Button className='primary-color' onClick={onAddNewShippingRule} disabled={loading} onprogress={loading} >Add new Shipping Schema</Button>
        </FlexBox>
      </FlexBox>

      <Table className='shipping-rules-table mt-4'>
        <Head>
          <HeadCell>Shipping Name</HeadCell>
          <HeadCell>Zone</HeadCell>
          <HeadCell>state</HeadCell>
          <HeadCell>Control</HeadCell>
        </Head>

        <Body>
          {shippingRules.map((shippingMethod = {}) => {
            const { name, enabled, _id, rates, zone } = shippingMethod;
            const zoneName = zoneOptions.find(({ value }) => value === zone)?.label;
            const isEditableShippingRule = editableShipingRuleId === _id;
            const controlButtonsProps = { isEditableShippingRule, onDeleteShippingRule, editableShipingRuleId, shippingRuleHasChanges, onEditShippingRule, shippingMethod, onConfirmCancelEdits, _id, saveLoading, onSave, hasInvalidRate };

            return (
              <Fragment key={_id}>
                <Row className={clx('shipping-rules-table-row', { open: isEditableShippingRule })} id={_id}>
                  <Cell>{name}</Cell>
                  <Cell>{zoneName}</Cell>
                  <Cell>{getShippingRuleState(enabled)}</Cell>
                  <Cell>
                    <ControlButtons {...controlButtonsProps} />
                  </Cell>
                </Row>
                <Expandable
                  open={isEditableShippingRule}
                  shippingRuleId={_id}
                  shippingRates={rates}
                  {...ExpandableProps}
                />
              </Fragment>
            );
          })}
        </Body>
      </Table>

      <DeleteModal shippingRuleId={deleteShippingRuleId} onClose={onCancelDeleteShippingRule} isVisible={deleteModalOpend} type='shipping' />
    </FlexBox>
  );
};

const mapStateToProps = ({ shippingRules = [], destinationZones }) => ({ shippingRules, destinationZones });

export default connect(mapStateToProps, shippingRulesActions)(ShippingRules);
