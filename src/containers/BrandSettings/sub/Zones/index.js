import React, { Fragment, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdCancel, MdDelete } from 'react-icons/md';
import clx from 'classnames';
import { connect } from 'react-redux';

import common from 'components/common';
import { notification } from 'libs';
import * as zonesActions from 'actions/destinationZones';
import { isNewObjHasChange } from 'helpers/common';
import { DeleteModal } from '../components/common';
import Expandable from './Expandable';

import './style.css';

const { Table, FlexBox, Button } = common;
const { Head, HeadCell, Body, Row, Cell } = Table;

const DestinationZone = ({ destinationZones, addNewDestinationZone, editDestinationZone }) => {
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
    setLoading(true);

    const defaultNumbersName = destinationZones
      .filter(({ name }) => name.toLowerCase().includes('zone'))
      .map((ele) => Number(ele?.name.split('zone')[1]))
      .sort((a, b) => a - b);

    const newDefaultNumber = defaultNumbersName.map((number, index) => {
      if (number !== index + 1)
        return index + 1;
    }).sort()[0] || defaultNumbersName.length + 1;


    const defaultZone = {
      name: `zone #${newDefaultNumber}`,
      countries: []
    };


    addNewDestinationZone(
      defaultZone,
      {
        onSuccess: (data) => {
          setLoading(false);
          autoOpenEditMode(data);
          notification.success('New Zone added successfully');
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

    editDestinationZone(
      { zone: editableZoneId, details: fields },
      {
        onSuccess: () => {
          setSaveLoading(false);
          setSavedZoneData(fields);
          if (cancelModalOpened) setCancelModalOpened(false);

          if (inTheSameExpandable)
            setEditableZoneId('');
          else
            autoOpenEditMode(commentedEditableZone);

          notification.success('You Change edited successfully');
        },
        onFailed: (message) => {
          setSaveLoading(false);
          notification.failed(message.replace('DestinationZone', 'Zone Name'));
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


  const deleteModalOpened = Boolean(deleteZoneId);


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
    <FlexBox className='destination-zones-container' column>
      <FlexBox className='v-center' flexEnd>
        <Button className='primary-color' onClick={onAddNewZone} disabled={loading} onprogress={loading} >Add new Zone</Button>
      </FlexBox>

      <Table className='destination-zones-table mt-4'>
        <Head>
          <HeadCell>Zone Name</HeadCell>
          <HeadCell>Countries Number</HeadCell>
          <HeadCell>States Number</HeadCell>
          <HeadCell>Control</HeadCell>
        </Head>

        <Body>
          {destinationZones.map((zone) => {
            const { name, countries = [], states = [], _id } = zone;
            const isEditableZone = editableZoneId === _id;

            return (
              <Fragment key={_id}>
                <Row className={clx('destination-zones-table-row', { open: isEditableZone })} id={_id}>
                  <Cell>{name}</Cell>
                  <Cell>{countries.length}</Cell>
                  <Cell>{states.length}</Cell>
                  <Cell>
                    <FlexBox>
                      <MdDelete size={20} className='destination-zones-delete-icon' onClick={onDeleteZone(_id)} />
                      {!isEditableZone ?
                        (editableZoneId && zoneHasChanges) ?
                          <a href={`#${editableZoneId}`}><FaRegEdit size={20} className='destination-zones-edit-icon ml-3' onClick={onEditZone(zone)} /></a>
                          :
                          <FaRegEdit size={20} className='destination-zones-edit-icon ml-3' onClick={onEditZone(zone)} />
                        :
                        <MdCancel size={20} className='destination-zones-cancel-icon ml-3' onClick={onConfirmCancelEdits} />
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

      <DeleteModal zoneId={deleteZoneId} onClose={onCancelDeleteZone} isVisible={deleteModalOpened} type='zone' />
    </FlexBox>
  );
};

const mapStateToProps = ({ destinationZones = [] }) => ({ destinationZones });

export default connect(mapStateToProps, zonesActions)(DestinationZone);
