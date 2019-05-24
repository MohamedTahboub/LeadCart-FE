import moment from 'moment';

export default () => {
  const dates = [];

  const randomDate = (lastDate = moment().subtract(2, 'years').format()) => {
    const date = moment(lastDate).add('days', 6);

    // console.log(date.format());

    if (date.isAfter()) return dates;

    dates.push(date.format());
    return randomDate(date);
  };
  const randomPrice = () => 150 + Math.round(Math.random() * 10);

  randomDate();
  const res = dates.map((d) => [d, randomPrice()]);
  return res;
};
