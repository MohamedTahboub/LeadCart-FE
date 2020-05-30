import React, { useState } from 'react';
import common from 'components/common';
// import clx from 'classnames';
import FlexibleBox from 'components/FlexibleBox';
import CodeEditor from 'components/CodeEditor';
import { useContext } from '../../../../../../actions';
import CodeExecutor from './CodeExecutor';
import './style.css';
const {
  //   Button,
  //   ResizableInput,
  ResizableTextarea,
  Tab,
  Tabs
} = common;

const CodeSection = ({
  section = {},
  ...props
}) => {

  const { actions = {} } = useContext();
  const { styles = {}, content = {} } = section;

  const onChange = ({ target: { name, value } }) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name,
        value
      }
    });
  };

  const onSizeChange = (size) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'styles.height',
        value: size.height
      }
    });
  };

  const onEditorHeightChange = (height) => {
    if (height > styles.height)
      onSizeChange({ height });
  };
  return (
    <FlexibleBox
      size={{ height: styles.height }}
      className='code-section'
      onResizeStop={onSizeChange}
      showOnParentHover
      {...props}
    >
      <Tabs active='edit'>
        <Tab id='edit' title='Edit' className='p-2'>
          <CodeEditor
            name='content.value'
            onChange={onChange}
            value={content.value}
            withIndent
            style={{
              height: styles.height - 50,
              outlineStyle: 'none'
            }}
          />
        </Tab>
        <Tab id='preview' title='Preview' className='p-2'>
          <CodeExecutor
            parentHeight={styles.height}
            code={content.value}
          />
        </Tab>
      </Tabs>
    </FlexibleBox>
  );
};

CodeSection.propTypes = {};

export default CodeSection;
