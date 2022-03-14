import { useCallback, useState } from 'react';
import useEventListener from '@use-it/event-listener';

export default (initial = false) => {
  const [isBlocked, setIsBlocked] = useState(initial);

  const updateBlock = (shouldBlock) => {
    setIsBlocked(shouldBlock);
  };

  const shouldBlockCb = useCallback(
    (event) => {
      if (isBlocked) {
        event.preventDefault();
        event.returnValue = '';
      }
    },
    [isBlocked]
  );

  useEventListener('beforeunload', shouldBlockCb);
  return [isBlocked, updateBlock];
};
