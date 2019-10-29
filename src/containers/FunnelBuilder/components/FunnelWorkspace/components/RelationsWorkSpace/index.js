import React from 'react';
import PropTypes from 'prop-types';
import NodeRelation from '../NodeRelation';

import './style.css';

const RelationsWorkSpace = ({
  relations,
  ...props
}) => (
  <svg
    className='funnel-nodes-relactions-svg'
    width='100%'
    height='100%'
  >
    {relations.map((relation) => <NodeRelation {...relation} />)}
  </svg>
);

RelationsWorkSpace.propTypes = {

};

export default RelationsWorkSpace;
