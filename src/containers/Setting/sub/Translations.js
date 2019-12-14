import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as translationsActions from 'actions/translations';
import common from 'components/common';
import Table from 'components/common/Tables';
import { injectDefaultLabels } from 'libs'
import {
  TranslationEditModal as EditModal
} from './components';
import moment from 'moment';

const {
  MainBlock,
  MiniButton,
  Button,
} = common;


const Translations = ({ languages = [] }) => {

  const [openModal, setOpenModal] = useState();
  const [isEdit, setIsEdit] = useState();

  const onOpenModal = () => {
    setOpenModal(true);
    setIsEdit()
  };

  const onOpenEditModal = (id) => {
    const language = languages.find(language => language._id === id)
    if (!language) return;

    setIsEdit(language)
    setOpenModal(true)
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setIsEdit()
  };

  const languagesRows = (
    <Table>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Type(Language Direction)</Table.HeadCell>
        <Table.HeadCell>Language Code</Table.HeadCell>
        <Table.HeadCell>Last Update Date</Table.HeadCell>
        <Table.HeadCell />
      </Table.Head>
      <Table.Body>
        {languages.map(({
          _id: id,
          name = 'Untitled',
          default: defaultLanguage,
          languageCode,
          updatedAt,
          type,
        }, orderInList) => (
            <Table.Row
              key={id}
              orderInList={orderInList}
              className='member-table-row'
            >
              <Table.Cell mainContent={name} />
              <Table.Cell className={'uppercase-text'} mainContent={type} />
              <Table.Cell mainContent={languageCode} />
              <Table.Cell mainContent={moment(updatedAt).format('MMM DD YYYY')} />
              <Table.Cell className='flex-container'>
                <MiniButton
                  toolTip='Delete'
                  className='table-row-delete-btn position-right-70'
                  iconClass='fa-trash-alt'
                  disabled={defaultLanguage}
                // onClick={() => setShowDeleteModal(couponId)}
                />
                <MiniButton
                  toolTip='Edit'
                  className='table-row-edit-btn position-right-10'
                  iconClass='fas fa-edit'
                  disabled={defaultLanguage}
                  onClick={() => onOpenEditModal(id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );


  return (
    <div>
      <MainBlock
        title='Translation Languages'
        blockHandel={(
          <Button
            onClick={onOpenModal}
            className='primary-color'
          >
            New Language
          </Button>
        )}
      />
      {languagesRows}

      <EditModal
        open={openModal}
        onClose={onCloseModal}
        isNew={!isEdit}
        language={isEdit}
      />
    </div>
  );
};

// {errors.modal && <span className='error-message'>{errors.modal}</span>}
Translations.propTypes = {

};
Translations.defaultProps = {
  languages: []
};

const mapStateToProps = ({ translations: languages }) => ({ languages: injectDefaultLabels(languages) });
export default connect(mapStateToProps, translationsActions)(Translations);
