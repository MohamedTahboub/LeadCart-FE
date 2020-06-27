import verifyAccount from './verifyAccount';
import forgotPassword from './forgotPassword';
import verifyResetKey from './verifyResetKey';
import resetPassword from './resetPassword';
import updateUserDetails from './updateUserDetails';
import updateUserPassword from './updateUserPassword';
import redemption from './redemption';

export default [
  verifyAccount,
  forgotPassword,
  verifyResetKey,
  resetPassword,
  updateUserDetails,
  updateUserPassword,
  ...redemption
];
