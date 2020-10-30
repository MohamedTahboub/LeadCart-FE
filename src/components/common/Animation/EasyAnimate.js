import React from 'react';
import { animated, useSpring } from 'react-spring';


export default ({
  children,
  onClick,
  className,
  delay = 0,
  ...rest
}) => {
  const props = useSpring({
    delay,
    from: { opacity: 0, color: '#fff' },
    to: { opacity: 1, color: 'rgba(0, 0, 0, 0.4)' }
  });


  return (
    <animated.div
      onClick={onClick}
      style={props}
      className={className}
      {...rest}
    >
      {children}
    </animated.div>
  );
};
