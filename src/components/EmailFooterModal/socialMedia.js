import React, { useState, useEffect } from 'react';
import common from 'components/common';
import * as yup from 'yup';
import ids from 'shortid';

import './style.css';
const { InputRow } = common;

const supportedPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin'];

const LinkRow = ({ link: { name, link } = {}, id, ...props }) => {
  const onDelete = () => {
    props.onDelete(id);
  };

  return (
    <InputRow>
      <InputRow.Label>
        {name}
        :
      </InputRow.Label>
      <InputRow.NormalInput
        disabled
        value={link}
      />
      <span onClick={onDelete} className='btn delete-btn social-btn'>
        <i className='fas fa-trash-alt' />
      </span>
    </InputRow>
  );
};


const NewLink = ({ remainsPlatforms = [{}], onAdd }) => {
  // console.log("=============>", remainsPlatforms)

  const [socialLink, setSocialLink] = useState();
  const [socialPlatform, setSocialPlatform] = useState(remainsPlatforms[0].value);
  const [error, setError] = useState();

  const onChange = ({ target: { value } }) => {
    setSocialLink(value);
    setError('');
  };
  const onSelect = ({ target: { value } }) => {
    setSocialPlatform(value);
    setError('');
  };

  const onSave = async () => {
    const linkSchema = yup.string().url().required();

    const isValidLink = await linkSchema.isValid(socialLink);
    if (!isValidLink) return setError('you have provided an invalid URL link');
    onAdd({
      name: socialPlatform,
      link: socialLink
    });

    // setSocialLink({});
  };
  useEffect(() => {
    if (socialPlatform !== remainsPlatforms[0].value) setSocialPlatform(remainsPlatforms[0].value);
  }, [remainsPlatforms]);

  return (
    <InputRow>
      <InputRow.SelectOption
        options={remainsPlatforms}
        value={socialPlatform}
        onChange={onSelect}
        className='social-media-platform-name'
      />
      <InputRow.NormalInput
        className='social-media-link'
        error={error}
        value={socialLink}
        onChange={onChange}
      />
      <span onClick={onSave} className='btn save-btn social-btn'>
        <i className='fas fa-save' />
      </span>
    </InputRow>
  );
};


export default ({ links = [], ...props }) => {
  const onChange = (value) => {
    props.onChange({
      target: {
        name: 'socialMedia',
        value
      }
    });
  };
  const onDelete = (linkId) => {
    const newLinks = links.filter((l, id) => id !== linkId);
    onChange(newLinks);
  };

  const onAddLink = (socialLink) => {
    const newLinks = [...links, socialLink];

    onChange(newLinks);
  };
  const availableSocialPlatforms = supportedPlatforms.filter((p) => !links.find(({ name }) => name === p)).map((p) => ({ label: p, value: p }));
  return (
    <div className='email-social-media'>
      {links.map((link, id) => (
        <LinkRow
          id={id}
          key={ids.generate()}
          link={link}
          onDelete={onDelete}
        />))
      }
      {!!availableSocialPlatforms.length && (
        <NewLink
          remainsPlatforms={availableSocialPlatforms}
          onAdd={onAddLink}
        />
      )}
    </div>
  );
};
