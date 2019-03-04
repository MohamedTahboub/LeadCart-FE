import React from 'react';
import { useSpring, animated } from 'react-spring';


export default ({ children, className }) => {
  const props = useSpring({
    to: async (next) => {
      await next({ opacity: 1, color: 'rgba(0, 0, 0, 0.4)' });
    },
    from: { opacity: 0, color: '#fff' }
  });


  return (
    <animated.div
      style={props}
      className={className}
    >
      {
        children}
    </animated.div>
  );
};
