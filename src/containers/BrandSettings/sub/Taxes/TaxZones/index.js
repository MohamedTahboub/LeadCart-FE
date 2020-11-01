import React, { Fragment, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdCancel, MdDelete } from 'react-icons/md';
import clx from 'classnames';
import { connect } from 'react-redux';

import common from 'components/common';
import { notification } from 'libs';
import * as zonesActions from 'actions/taxZones';
import { isNewObjHasChange } from 'helpers/common';
import { DeleteModal } from '../components';
import Expandable from './Expandable';

import './style.css';

const { Table, FlexBox, Button } = common;
const { Head, HeadCell, Body, Row, Cell } = Table;

const TaxZones = ({ taxZones, addNewTaxZone, editTaxZone, history }) => {
  const [savedZoneData, setSavedZoneData] = useState({});
  const [fields, setFields] = useState({});
  const [editableZoneId, setEditableZoneId] = useState('');
  const [deleteZoneId, setDeleteZoneId] = useState('');
  const [cancelModalOpened, setCancelModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [commentedEditableZone, setCommentedEditableZone] = useState('');

  const onChange = ({ target: { value, name } }) => setFields({ ...fields, [name]: value });
  const zoneHasChanges = isNewObjHasChange(savedZoneData, fields);

  const autoOpenEditMode = (data) => {
    setEditableZoneId(data._id);
    const newObj = { ...data };
    delete newObj._id;
    delete newObj?.brand;
    delete newObj?.createdAt;
    delete newObj?.updatedAt;
    delete newObj?.__v;
    delete newObj?.states;
    delete newObj?.zipCodes;
    setFields(newObj);
    setSavedZoneData(newObj);
  };

  const onAddNewZone = () => {
    const defaultZone = {
      name: 'Palestine',
      countries: [
        'PS'
      ]
    };

    setLoading(true);
    addNewTaxZone(
      defaultZone,
      {
        onSuccess: (data) => {
          setLoading(false);
          autoOpenEditMode(data);
          notification.success('New Zone added successfuly');
        },
        onFailed: (message) => {
          setLoading(false);
          notification.failed(message);
        }
      }
    );
  };


  const onSave = () => {
    const inTheSameExpandable = commentedEditableZone._id === editableZoneId;

    setSaveLoading(true);


    editTaxZone(
      { taxZone: editableZoneId, details: fields },
      {
        onSuccess: () => {
          setSaveLoading(false);
          setSavedZoneData(fields);
          if (cancelModalOpened) setCancelModalOpened(false);

          if (inTheSameExpandable)
            setEditableZoneId('');
          else
            autoOpenEditMode(commentedEditableZone);

          notification.success('You Change edited successfuly');
        },
        onFailed: (message) => {
          setSaveLoading(false);
          notification.failed(message);
        }
      }
    );
  };


  const onEditZone = ({ name, countries = [], states = [], _id }) => () => {
    const editableData = { name, countries };
    setCommentedEditableZone({ name, countries, states, _id });

    if (zoneHasChanges) {
      setCancelModalOpened(true);
    } else {
      setEditableZoneId(_id);
      setSavedZoneData(editableData);
      setFields(editableData);
    }
  };


  const onConfirmCancelEdits = () => {
    if (zoneHasChanges)
      setCancelModalOpened(true);
    else
      setEditableZoneId('');
  };

  const onCancelEdits = () => {
    const inTheSameExpandable = commentedEditableZone._id === editableZoneId;
    setFields(savedZoneData);
    setCancelModalOpened(false);

    if (inTheSameExpandable)
      setEditableZoneId('');
    else
      setEditableZoneId(commentedEditableZone._id);

  };


  const onDeleteZone = (ZoneId) => () => setDeleteZoneId(ZoneId);
  const onCancelDeleteZone = () => setDeleteZoneId('');
  const onCloseCancelModal = () => setCancelModalOpened(false);


  const deleteModalOpend = Boolean(deleteZoneId);


  const ExpandableProps = {
    onSave,
    onConfirmCancelEdits,
    saveLoading,
    setEditableZoneId,
    onChange,
    fields,
    savedZoneData,
    onCloseCancelModal,
    cancelModalOpened,
    onCancelEdits
  };

  return (
    <FlexBox className='tax-zones-container' column>
      <FlexBox className='v-center' flexEnd>
        <Button className='primary-color' onClick={onAddNewZone} disabled={loading} onprogress={loading} >Add new Tax Zone</Button>
      </FlexBox>

      <Table className='tax-zones-table mt-4'>
        <Head>
          <HeadCell>Tax Zone Name</HeadCell>
          <HeadCell>Countries Number</HeadCell>
          <HeadCell>States Number</HeadCell>
          <HeadCell>Control</HeadCell>
        </Head>

        <Body>
          {taxZones.map((taxZone) => {
            const { name, countries = [], states = [], _id } = taxZone;
            const isEditableZone = editableZoneId === _id;

            return (
              <Fragment key={_id}>
                <Row className={clx('tax-zones-table-row', { open: isEditableZone })} id={_id}>
                  <Cell>{name}</Cell>
                  <Cell>{countries.length}</Cell>
                  <Cell>{states.length}</Cell>
                  <Cell>
                    <FlexBox>
                      <MdDelete size={20} className='tax-zones-delete-icon' onClick={onDeleteZone(_id)} />
                      {!isEditableZone ?
                        (editableZoneId && zoneHasChanges) ?
                          <a href={`#${editableZoneId}`}><FaRegEdit size={20} className='tax-zones-edit-icon ml-3' onClick={onEditZone(taxZone)} /></a>
                          :
                          <FaRegEdit size={20} className='tax-zones-edit-icon ml-3' onClick={onEditZone(taxZone)} />
                        :
                        <MdCancel size={20} className='tax-zones-cancel-icon ml-3' onClick={onConfirmCancelEdits} />
                      }
                    </FlexBox>
                  </Cell>
                </Row>
                <Expandable
                  open={isEditableZone}
                  {...ExpandableProps}
                />
              </Fragment>
            );
          })}
        </Body>
      </Table>

      <DeleteModal taxZoneId={deleteZoneId} onClose={onCancelDeleteZone} isVisible={deleteModalOpend} type='zone' />
    </FlexBox>
  );
};

const mapStateToProps = ({ taxZones }) => ({ taxZones });

export default connect(mapStateToProps, zonesActions)(TaxZones);
