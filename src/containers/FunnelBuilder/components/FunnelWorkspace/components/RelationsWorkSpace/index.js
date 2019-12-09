import React from 'react';
// import PropTypes from 'prop-types';
import NodeRelation from '../NodeRelation';

import './style.css';

const RelationsWorkSpace = ({
  nodes,
}) => (
  <svg
    className='funnel-nodes-relactions-svg'
    width='100%'
    height='100%'
  >
    {nodes.map((node) => <NodeRelation {...node} />)}
  </svg>
);

RelationsWorkSpace.propTypes = {

};

export default RelationsWorkSpace;
