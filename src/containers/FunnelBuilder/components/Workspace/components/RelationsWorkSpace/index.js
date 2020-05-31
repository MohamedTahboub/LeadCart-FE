import React, { useMemo } from 'react';
import { NodeRelation } from './components';

import './style.css';

const RelationsWorkSpace = ({ nodes }) => useMemo(
  () => (
    <svg
      className='funnel-nodes-relations-svg'
      width='100%'
      height='100%'
    >
      {nodes.map((node) => <NodeRelation {...node} />)}
    </svg>
  ),
  [nodes]
);

RelationsWorkSpace.propTypes = {};

export default RelationsWorkSpace;
