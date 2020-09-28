import { connect } from 'react-redux';
import { passProps } from 'helpers/common';

const DisplayContent = ({ children, target, hide, type: packageType }) => {
  if (hide) return null;
  if (target && packageType !== target) return null;
  return children;
};

DisplayContent.propTypes = {};

export default connect(passProps('user.user.activePackage.type'))(DisplayContent);
