import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';
import defaultLanguage from 'data/defaultLanguage.json';
import common from 'components/common';

import './style.css';
import { lang } from 'moment';

const {
    SmallButton,
    MainBlock,
    MiniButton,
    Button,
    InputRow,
    MainTitle
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
                    {subs.map((word) => (
                        <Word
                            {...word}
                            keyValue={`${keyValue}.${word.key}`}
                            onChange={onChange}
                        />
                    ))}
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
        console.log(keyValue, wordKey, value);
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
                    <div className='word-value'>
                        <span className='word-label'>Original Text</span>
                        <span className='word-input margin-right-60'>Translated Text</span>
                    </div>
                </div>
                {words.map((word) => (
                    <Word
                        {...word}
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
    const [language, setLanguage] = useState(languageData);
    const [searchKey, setSearchKey] = useState()

    const onSearch = ({ target: { value } }) => {
        setSearchKey(value)
    }

    const onSave = () => {
        const action = isNew ? createTranslationLanguage : updateTranslationLanguage;
        action(
            language, {
            onSuccess: () => {

            },
            onFailed: () => {

            }
        }
        );
    };

    useEffect(() => {
        setLanguage(languageData);
    }, [languageData]);

    const onChange = ({
        contextKey,
        wordKey,
        value
    }) => {
        // console.log(contextKey, wordKey, value);
        const newContexts = [...language.contexts];

        const updatedContexts = newContexts.map((context) => {
            console.log('context', context, contextKey);
            if (context.key === contextKey) {
                context.words = context.words.map((word) => {
                    if (word.key === wordKey) return { ...word, value };
                    return word;
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

    return (
        <Modal
            isVisible={open}
            onClose={onClose}
        >
            <MainTitle>{name}</MainTitle>
            <InputRow.TextField
                className='words-search-field'
                value={searchKey}
                placeholder='Search For Words'
                onChange={onSearch}
            // name={keyValue}
            // id={keyValue}
            />
            <div className='language-contexts'>
                {contexts.map((context) => (
                    <LanguageContext
                        {...context}
                        keyValue={context.key}
                        onChange={onChange}
                    />
                ))}
            </div>
            <Button
                onClick={onSave}
                className='primary-color margin-with-float-right'
            >
                <i className='fas fa-plus' />
                {`${isNew ? 'Create' : 'Update'}`}
            </Button>
        </Modal>
    );
};

TranslationEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isNew: PropTypes.bool.isRequired,
    language: PropTypes.objectOf(PropTypes.object)
};
TranslationEditModal.defaultProps = {
    language: []
};
export default TranslationEditModal;
