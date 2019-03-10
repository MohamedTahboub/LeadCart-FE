import React from 'react';
import { useSpring, animated } from 'react-spring';


export default ({ children, className, delay = 0 }) => {
  const props = useSpring({
    delay,
    from: { opacity: 0, color: '#fff' },
    to: { opacity: 1, color: 'rgba(0, 0, 0, 0.4)' }
  });

  console.log('animation cycle');
  return (
    <animated.div
      style={props}
      className={className}
    >
      {children}
    </animated.div>
  );
};
