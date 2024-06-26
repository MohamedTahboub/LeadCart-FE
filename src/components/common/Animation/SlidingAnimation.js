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

  const props = useSpring({
    from: { opacity: 0, transform: type(units) },
    to: { opacity: 1, transform: type(0) }
  });


  return (
    <animated.div
      onClick={onClick}
      style={props}
      className={className}
    >
      {children}
    </animated.div>
  );
};
