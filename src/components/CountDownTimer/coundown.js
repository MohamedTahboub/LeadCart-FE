import moment from 'moment';
import { isFunction } from 'libs/checks';

const DAY_IN_MSEC = (1000 * 60 * 60 * 24);
const HOUR_IN_MSEC = (1000 * 60 * 60);
const MINUTE_IN_MSEC = (1000 * 60);
const SEC_IN_MSEC = (1000);


const getTargetDate = ({
  type,
  date,
  days = 0,
  hours = 0,
  minutes = 0
}) => {
  if (type === 'fixedTime') return moment(date).valueOf();

  const time = moment();
  time.add(days, 'days');
  time.add(hours, 'hours');
  time.add(minutes, 'minutes');

  return time.valueOf();
};
export default (target, finishedCb) => {
  const targetDate = getTargetDate(target);

  let updateFunction;
  const ticks = setInterval(() => {
    const now = new Date().getTime();

    const distance = targetDate - now + 10000;

    if (distance < 0) {
      if (isFunction(finishedCb)) isFunction();

      return clearInterval(ticks);
    }


    const days = Math.floor(distance / DAY_IN_MSEC);
    const hours = Math.floor((distance % DAY_IN_MSEC) / HOUR_IN_MSEC);
    const minutes = Math.floor((distance % HOUR_IN_MSEC) / MINUTE_IN_MSEC);
    const seconds = Math.floor((distance % MINUTE_IN_MSEC) / SEC_IN_MSEC);

    const result = {
      days, hours, minutes, seconds
    };
    if (isFunction(updateFunction)) updateFunction(result);
  },
  SEC_IN_MSEC);


  return {
    tick: (cb) => {
      if (isFunction(cb)) updateFunction = cb;
      else clearInterval(ticks);
    }
  };
};

