
export default (execute, initialWatchedValue, interval) => {
  const previous = initialWatchedValue;
  let instants = 0;


  return {
    on: (data) => {
      if (previous !== data) {
        instants += 1;
        setTimeout(() => {
          execute(data);
        },
        interval * instants);
      }
    }
  };
};
