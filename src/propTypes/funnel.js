import PropTypes from 'prop-types';
import productTypes from './product';
import rulesEvents from 'data/rulesEvents';

const triggers = rulesEvents.map(({ value }) => value);

const triggerGroup = PropTypes.shape({});
const rule = PropTypes.shape({
  trigger: PropTypes.oneOf(triggers).isRequired,
  triggerGroups: PropTypes.arrayOf(triggerGroup)
});

export default {
  rule,
  product: productTypes
};
