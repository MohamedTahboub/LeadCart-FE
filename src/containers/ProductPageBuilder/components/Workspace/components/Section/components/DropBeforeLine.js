import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import SectionContent from './SectionContent';
import sectionTemplates from 'data/productSectionsTemplates';

const DropBeforeLine = ({
  className,
  show,
  item
}) => {
  const classes = clx({
    [className]: className,
    'drop-before-line': true,
    show
  });
  let section = {};
  if (item) {
    if (item.section.id) section = { ...item, type: item.section.type };
    else if (item.section.type === 'layout') section = { type: 'layout', section: sectionTemplates[item.section.type] };
    else section = sectionTemplates[item.section.type];
  } else {
    return null;
  }
  section.shallow = true;
  return (
    <div className={classes}>
      <SectionContent shallow {...section}/>
    </div>
  );
};

DropBeforeLine.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool
};
DropBeforeLine.defaultProps = {
  className: '',
  show: false
};

export default DropBeforeLine;
