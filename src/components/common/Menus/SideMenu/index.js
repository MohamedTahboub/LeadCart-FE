import React, { useEffect, useState } from 'react';
import { RiPushpin2Fill, RiPushpinLine } from 'react-icons/ri';
import clx from 'classnames';
import { FlexBox } from '../../boxes';
import './style.css';


const SideMenu = ({
  className,
  position,
  children,
  onChange,
  toggleOnHover,
  withCloseBtn = true,
  ...props
}) => {
  const [open, setOpen] = useState(true);

  const onToggle = () => {
    setOpen((open) => {
      if (typeof onChange === 'function') onChange(open);

      return !open;
    });
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const defaultClasses = 'side-bar-menu white-bg soft-edges soft-shadow';

  const classes = clx(defaultClasses, className, {
    [`${position}-position`]: position,
    'open-on-hover': toggleOnHover,
    open
  });

  const iconRotateClass = clx('animate', 'large-text');

  return (
    <div className={classes}>
      {withCloseBtn && (
        <FlexBox
          center='v-center h-center'
          onClick={onToggle}
          className='menu-close-btn gray-color white-bg item-clickable'
          role='presentation'
        >{
            open ? (
              <RiPushpin2Fill className={iconRotateClass} />
            ) : (
              <RiPushpinLine className={iconRotateClass} />
            )
          }
        </FlexBox>
      )
      }
      {children}
    </div>
  );
};

export default SideMenu;
