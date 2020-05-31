import React, { useRef } from 'react';


const defaultHeight = 400;

const CodeExecutor = ({
  code,
  parentHeight = defaultHeight
}) => {

  const iframeRef = useRef(null);

  const iframeHeight = parentHeight - 20;
  return (
    <iframe
      ref={iframeRef}
      title='Embedded Code Here'
      sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
      srcDoc={code}
      className='code-exec-iframe'
      style={{ height: iframeHeight }}
    />
  );

};

CodeExecutor.propTypes = {};

export default CodeExecutor;
