import React from 'react';
import { useSpring, animated } from 'react-spring';


export default ({
  children,
  onClick,
  className,
  delay = 0
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
    >
      {children}
    </animated.div>
  );
};
