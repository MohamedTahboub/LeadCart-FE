import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ToolTip from 'react-tooltip';
import ids from 'shortid';
import { AiOutlineFileAdd } from 'react-icons/ai';

import * as filesActions from 'actions/files';
import common from 'components/common';
import FontRow from './FontRow';

import './style.css';

const { FlexBox, Title, Button } = common;

const CustomFonts = ({ uploadFile, setHasNewFonts, selectedNewFonts, setSelectedNewFonts, onSave }) => {
  const ref = useRef(null);

  const onUploadFont = ({ target: { files, name: source } }) => {
    const file = files[0];
    const family = file.name.split('.').slice(0, -1).join('');


    uploadFile(
      { file, type: 'products', source },
      { onSuccess: (url) => setSelectedNewFonts([...selectedNewFonts, { url, family, id: ids.generate() }]) }
    );
  };

  const onDeleteFile = (elementId) => () => {
    const newList = selectedNewFonts.filter(({ id }) => elementId !== id);
    setSelectedNewFonts(newList);
  };

  const onUploaderClicked = () => ref?.current?.click();
  const hasUploadedFiles = Boolean(selectedNewFonts.length);

  useEffect(() => setHasNewFonts(hasUploadedFiles), [hasUploadedFiles]);


  return (
    <FlexBox className='products-custom-fonts' column >
      <FlexBox className='products-custom-fonts-header' >
        <Title className='flex-1' >
          You can upload your custom font and use it in your products
        </Title>

        <Button className='products-custom-fonts-uploader light-btn' onClick={onUploaderClicked} >
          <FlexBox className='v-center' >
            <AiOutlineFileAdd size={16} className='mr-1' />
            Add Custom Font
          </FlexBox>
          <input
            onChange={onUploadFont}
            style={{ display: 'none' }}
            ref={ref}
            type='file'
            accept='TTF/OTF, WOFF, WOFF2'
          />
        </Button>
      </FlexBox>

      <FlexBox className='products-custom-fonts-content' flex >
        {selectedNewFonts.map((ele) => {
          return (<FontRow onDeleteFile={onDeleteFile} {...ele} />);
        })}
      </FlexBox>

      <FlexBox
        data-tip="You don't have any font to add"
        data-tip-disable={hasUploadedFiles}
        data-place='left'
        className='full-width'
        flexEnd
      >
        <Button className='primary-color' disabled={!hasUploadedFiles} onClick={onSave}>
          Add and Save
        </Button>
      </FlexBox>

      <ToolTip/>
    </FlexBox>
  );
};

export default connect(({ files }) => ({ files }), { ...filesActions })(CustomFonts);

