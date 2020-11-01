import React, { useState } from 'react';
import Split from 'react-split';
import { isFunction } from 'libs/checks';
import clx from 'classnames';

const SplitAreaItem = ({
  onClick,
  active,
  backgroundType,
  backgroundImage,
  backgroundColor,
  className,
  size = 50,
  style = {},
  ...props
}) => {
  const classNames = clx('split-area-item', className, { active });

  const styles = style;
  if (backgroundType === 'image')
    styles.backgroundImage = `url(${backgroundImage})`;
  else
    styles.backgroundColor = backgroundColor;

  const percentage = `${Math.floor(size * 100) / 100}%`;

  return (
    <div className={classNames} onClick={onClick} {...props} style={styles} >
      {percentage}
    </div>
  );
};


export default ({ onChange, onActiveChange, details = {} }) => {

  const [active, setActive] = useState(1);

  const onDragChange = (sizes) => {
    if (isFunction(onChange))
      onChange(sizes, active);

  };

  const updateActive = (active) => () => {
    setActive(active);
    if (isFunction(onActiveChange))
      onActiveChange(active);
  };

  const { firstSectionBackground = {}, secondSectionBackground = {}, splits } = details;
  const isTwoSplits = `${splits}` === `${2}`;

  if (!isTwoSplits) {
    return (
      <SplitAreaItem active size={100} className='solo' {...firstSectionBackground} />
    );
  }

  const { size: firstSectionSize = 50 } = firstSectionBackground;
  const { size: secondSectionSize = 50 } = secondSectionBackground;

  return (
    <Split
      sizes={[firstSectionSize, secondSectionSize]}
      minSize={50}
      expandToMin={false}
      gutterSize={10}
      direction='horizontal'
      cursor='col-resize'
      className='split-area-container mx-3'
      onDragEnd={onDragChange}
    >
      <SplitAreaItem active={active === 1} size={firstSectionSize} onClick={updateActive(1)} {...firstSectionBackground} />
      <SplitAreaItem active={active === 2} size={secondSectionSize} onClick={updateActive(2)} {...secondSectionBackground} />
    </Split>
  );
};
