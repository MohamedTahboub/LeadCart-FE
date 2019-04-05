import React, { useState, Fragment } from 'react';
import common from 'components/common'
import * as yup from 'yup';
import ids from 'shortid'

import './style.css'
const { InputRow } = common

const supportedPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin']

const LinkRow = ({ link: { name, link } = {}, id, ...props }) => {

  const onDelete = () => {
    props.onDelete(id)
  }

  return (
    <InputRow>
      <InputRow.Label>{name}:</InputRow.Label>
      <InputRow.NormalInput
        disabled
        value={link}
      />
      <span onClick={onDelete} className='btn delete-btn social-btn'>
        <i className='fas fa-trash-alt' />
      </span>
    </InputRow>
  )
}


const NewLink = ({ remainsPlatforms, onAdd }) => {

  // console.log("=============>", remainsPlatforms)

  const [socialLink, setSocialLink] = useState({})
  const [error, setError] = useState();

  const onChange = ({ target: { value, name } }) => {

    if (name === 'link' && error) setError("")


    setSocialLink({ ...socialLink, [name]: value });
  }

  const onSave = async () => {
    const v = remainsPlatforms[0] && remainsPlatforms[0].value
    if (!error) {
      if (!socialLink.name)
        socialLink.name = v

      const linkSchema = yup.string().url().required();

      const isValidLink = await linkSchema.isValid(socialLink.link)
      if (!isValidLink)
        return setError('you have provided an invalid URL link');
      onAdd(socialLink)
      setSocialLink({})
    }
  }

  const { name, link } = socialLink
  return (
    <InputRow>
      <InputRow.SelectOption
        options={remainsPlatforms}
        name='name'
        onChange={onChange}
        className='social-media-platform-name'
      />
      <InputRow.NormalInput
        className='social-media-link'
        error={error}
        name='link'
        value={link}
        onChange={onChange}
      />
      <span onClick={onSave} className='btn save-btn social-btn'>
        <i className='fas fa-save' />
      </span>
    </InputRow>
  )
}


export default ({ links, ...props }) => {

  const onChange = (value) => {
    props.onChange({
      target: {
        name: 'socialMedia',
        value
      }
    })
  }
  const onDelete = (linkId) => {
    const newLinks = links.filter((l, id) => id !== linkId)
    onChange(newLinks);
  }

  const onAddLink = (socialLink) => {
    const newLinks = [...links, socialLink]

    onChange(newLinks);
  }

  const availableSocialPlatforms = supportedPlatforms.filter(p => !links.find(({ name }) => name === p)).map(p => ({ label: p, value: p }))
  return (
    <div className="email-social-media">
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
  )
}