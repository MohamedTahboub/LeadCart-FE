import React, { useRef, useState } from 'react';
import common from 'components/common';
import { notification } from 'libs';

import { generateRandomCodes, handleFile, invalidFormat, isValidCodeList, prepareCodesList, prepareForDisplay } from './helpers';
const {
  FlexBox,
  InputRow,
  Note,
  Button
} = common;

const { Label, TextAreaInput } = InputRow;


const LicensesDistribution = ({
  onChange,
  codes: codeList = [],
  setDisableAdd,
  instructions = ''
}) => {
  const [isValid, setValid] = useState(true);
  const codes = prepareForDisplay(codeList);
  const inputFile = useRef();

  const updateCodeList = (codes) => {
    onChange({
      target: {
        name: 'action.metaData.codes',
        value: prepareCodesList(codes)
      }
    });
    setValid(true);
    setDisableAdd(true);
  };

  const _onChange = ({ target: { value = '' } }) => {
    const codes = value.split('\n');
    if (isValidCodeList(codes))
      updateCodeList(codes);
    else
      setValid(false);

  };

  const openFile = () => {
    inputFile.current.click();
  };

  const onFileSelected = async (e) => {
    try {
      const [file] = e.target.files;
      const codes = await handleFile(file);
      updateCodeList(codes);
    } catch (error) {
      notification.failed(error.message, { duration: 10000 });
    }
  };


  const onDownloadSampleFile = () => {
    const dataRows = generateRandomCodes();
    const fileName = 'sample licenses file(valid).csv';
    const download = document.createElement('a');
    const fileHref = `data:text/csv;charset=utf-8,${encodeURIComponent(dataRows)}`;
    download.setAttribute('href', fileHref);
    download.setAttribute('download', fileName);
    download.click();
  };

  const onBlur = () => {
    if (!isValid) {
      notification.failed(invalidFormat, { duration: 10000 });
      setDisableAdd(false);
    }
  };

  return (
    <FlexBox column>
      <Note
        showOnce
        // referenceLink='https://help.leadcart.io'
        className='mx-auto'
      >
                You can distribute your Licenses by uploading the licenses list file (CSV format),
                or add them manually in the textarea box below.
        <br />
                Note: Download the Sample csv file to checkout the correct format.
      </Note>
      <InputRow>
        <Label>
                    Licenses List:
        </Label>
        <TextAreaInput
          name='action.metaData.codes'
          onChange={_onChange}
          value={codes}
          onBlur={onBlur}
          wordName='codes'
        />
      </InputRow>
      <FlexBox flex center='h-center'>
        <span className='title mr-4'>OR</span>
        <Button className='ml-5 primary-color' onClick={openFile}>
                    Upload CSV Licenses File
        </Button>
        <input
          type='file'
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={onFileSelected}
          accept='.csv'
        />
        <span className='ml-4 underlined-text gray-text item-clickable' onClick={onDownloadSampleFile}>Sample CSV File</span>
      </FlexBox>
    </FlexBox>
  );
};

export default LicensesDistribution;
