import datesValuesReferences from 'data/references/dates.js';

export default (date) => datesValuesReferences[date] || {
  min: undefined,
  max: undefined
};
