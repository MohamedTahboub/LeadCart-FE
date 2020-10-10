import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as immutable from 'object-path-immutable';

import { Modal } from 'components/Modals';
import defaultLanguage from 'data/defaultLanguage.json';
import common from 'components/common';
import * as translationsActions from 'actions/translations';
import { languagesSchema } from 'libs/validation';
import './style.css';

import { friendlyMessage } from 'libs';
const {
  Button,
  InputRow,
  MainTitle,
  Currency
} = common;


const Word = ({
  keyValue,
  value,
  label = value,
  onChange,
  subs = []
}) => {
  const hasSubs = !!subs.length;


  return (
    <div className='language-word-item'>
      <div className='word-value'>
        <label
          htmlFor={keyValue}
          className='word-label'
        >
          {`${label}:`}
        </label>
        <InputRow.TextField
          className='word-input'
          value={value}
          onChange={onChange}
          name={keyValue}
          id={keyValue}
        />

      </div>

      {hasSubs && (
        <div className='word-subs'>
          {subs.map((word) => {
            const kv = `${keyValue}.${word.key}`;
            return (
              <Word
                {...word}
                key={kv}
                keyValue={kv}
                onChange={onChange}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const LanguageContext = ({
  keyValue,
  title,
  words,
  ...props
}) => {
  const onChange = ({ target: { name: wordKey, value } }) => {
    props.onChange({
      contextKey: keyValue,
      wordKey,
      value
    });

  };

  return (
    <div className='language-context-container'>
      <div className='language-context-title'>
        {title}
      </div>
      <div className='language-context-words'>
        <div className='language-word-item'>
          <div className='word-value underlined'>
            <span className='word-label'>Original Text</span>
            <span className='word-input margin-right-60 title'>Translated Text</span>
          </div>
        </div>
        {words.map((word) => (
          <Word
            {...word}
            key={word.key}
            keyValue={word.key}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};


const TranslationEditModal = ({
  open,
  onClose,
  isNew,
  language: languageData,
  createTranslationLanguage,
  updateTranslationLanguage
}) => {
  const [language, setLanguage] = useState({});
  const [searchKey, setSearchKey] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const onSearch = ({ target: { value } }) => {
    setSearchKey(value);
  };

  const onSave = async () => {
    const { isValid, value } = await languagesSchema(language);
    if (!isValid) return; // setErrors(errors)


    const action = isNew
      ? createTranslationLanguage
      : updateTranslationLanguage;

    let payload;
    if (!isNew) {
      payload = {
        languageId: language._id,
        language: value
      };
    } else {
      payload = value;
    }

    setLoading(true);
    action(payload, {
      onSuccess: () => {
        setLoading(false);
        onClose();
      },
      onFailed: (error) => {
        setLoading(false);
        const message = friendlyMessage(error);
        setError(message);
      }
    });
  };

  useEffect(() => {
    setLanguage(languageData);
    setError();
    setSearchKey();
  }, [languageData]);

  const onChange = ({ contextKey, wordKey, value }) => {
    const newContexts = [...language.contexts];

    const updatedContexts = newContexts.map((context) => {
      if (context.key === contextKey) {
        context.words = context.words.map((word) => {

          if (wordKey.includes(word.key)) {
            if (word.subs) {
              return (
                immutable.set(
                  word, 'subs',
                  word.subs.map((ele) => {
                    if (wordKey.includes(ele.key))
                      return { ...ele, value };
                    else
                      return ele;
                  })
                ));
            } else {
              return { ...word, value };
            }
          } else {
            return word;
          }
        });

        return context;
      }
      return context;
    });
    setLanguage({
      ...language,
      contexts: updatedContexts
    });
  };
  const {
    name,
    contexts = []
  } = language;

  const filterLanguageContexts = (searchKey, contexts) => contexts.map((context) => {
    if (!searchKey) return context;

    const words = context.words.filter((word) => (
      (word.value
        && word.value
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      ) || (
        word.label
        && word.label
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      )
    ));

    return { ...context, words };
  });

  const onFieldChange = ({ target: { name, value } }) => {
    setLanguage({ ...language, [name]: value });
  };
  const filteredLanguageContexts = filterLanguageContexts(searchKey, contexts);

  const onToggleLanguageType = (type) => () => {
    setLanguage({ ...language, type });
  };

  return (
    <Modal
      className='language-edit-modal'
      isVisible={open}
      onClose={onClose}
    >
      <MainTitle className='underlined padding-bottom-10'>
        Language Syntax
      </MainTitle>
      <InputRow>
        <InputRow.Label>Language Name:</InputRow.Label>
        <InputRow.TextField
          className='language-name-input title'
          name='name'
          onChange={onFieldChange}
          value={name}
          placeholder='Language Name'
          max={50}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>Type (language direction):</InputRow.Label>
        <div>
          <InputRow.Checkbox
            className='margin-left-10'
            onClick={onToggleLanguageType('ltr')}
            checked={language.type === 'ltr'}
          >
            Left To Right
          </InputRow.Checkbox>
          <InputRow.Checkbox
            className='margin-left-10'
            onClick={onToggleLanguageType('rtl')}
            checked={language.type === 'rtl'}
          >
            Right To left
          </InputRow.Checkbox>
        </div>
      </InputRow>
      <InputRow.TextField
        className='words-search-field'
        prefix={<Currency value={<i className='fas fa-search' />} />}
        value={searchKey}
        placeholder='Search For Words'
        onChange={onSearch}
      />
      <div className='language-contexts'>
        {filteredLanguageContexts.map((context) => (
          <LanguageContext
            {...context}
            key={context.key}
            keyValue={context.key}
            onChange={onChange}
          />
        ))}
      </div>
      {error && <span className='error-message'>{error}</span>}
      <div>
        <Button
          disabled={loading}
          onprogress={loading}
          onClick={onSave}
          className='primary-color margin-with-float-right'
        >
          <i className='fas fa-plus' />
          {`${isNew ? 'Create' : 'Update'}`}
        </Button>
      </div>
    </Modal>
  );
};

TranslationEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isNew: PropTypes.bool.isRequired,
  language: PropTypes.objectOf(PropTypes.object)
};
TranslationEditModal.defaultProps = { language: defaultLanguage };
export default connect(null, translationsActions)(TranslationEditModal);
