import {
  UPGRADE_USER_PACKAGE,
  UPGRADE_USER_PACKAGE_SUCCESS,
  UPGRADE_USER_PACKAGE_FAILED,
  GET_USER_PLAN,
} from '../constantsTypes';


export const upgradeUserPackage = (packageDetails) => ({
  type: UPGRADE_USER_PACKAGE,
  payload: packageDetails
});
export const upgradeUserPackageSuccess = (packageDetails) => ({
  type: UPGRADE_USER_PACKAGE_SUCCESS,
  payload: packageDetails
});
export const upgradeUserPackageFailed = (packageDetails) => ({
  type: UPGRADE_USER_PACKAGE_FAILED,
  payload: packageDetails
});


export const getUserPlanSuccess = (activePkg) => ({
  type: GET_USER_PLAN,
  payload: activePkg
});

