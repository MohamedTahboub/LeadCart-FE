import React from 'react';

const MiniButton = ({
  iconClass,
  children,
  className = '',
  tooltip,
  onClick,
  active,
  ...props
}) => (
    <span
      data-tip={tooltip}
      onClick={onClick}
      className={`mini-btn  ${className} ${active ? 'active' : ''}`}
    >
      {iconClass && (
        <i
          className={`fas ${iconClass} scale-12`}
        />
      )}
      {children}
    </span>
  );

export default MiniButton;
