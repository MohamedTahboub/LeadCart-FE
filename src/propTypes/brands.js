import PropTypes from 'prop-types';

const activeBrand = PropTypes.shape({
  type: PropTypes.oneOf(['Free', 'Pro', 'Premium']).isRequired,
  period: PropTypes.oneOf(['Monthly', 'Yearly']).isRequired
});

const brandType = PropTypes.shape({
  activePackage: activeBrand.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  trial: PropTypes.bool.isRequired
});

export default {
  activeBrand,
  brandType
};
