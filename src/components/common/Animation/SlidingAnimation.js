import React from 'react';
import { useSpring, animated } from 'react-spring';


export default ({
  children,
  type: entryType = 'vertical',
  className,
  onClick,
  open,
  units = 400
}) => {
  // vertical or horizontal
  const type = (u) => (entryType === 'vertical' ? `translateY(${u}px)` : `translateX(${u}px)`);

  const openProps = useSpring({
    delay: 0,
    from: { opacity: 0, transform: type(units) },
    to: { opacity: 1, transform: type(0) }
  });
  const closeProps = useSpring({
    from: { opacity: 1, transform: type(0) },
    to: { opacity: 0, transform: type(units) },
  });


  return (
    <animated.div
      onClick={onClick}
      style={open ? openProps : closeProps}
      className={className}
    >
      {children}
    </animated.div>
  );
};
