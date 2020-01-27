import createFunnel from './create';
import updateFunnel from './update';
import deleteFunnel from './delete';
import funnelRules from './rules';

export default [
  createFunnel,
  updateFunnel,
  deleteFunnel,
  ...funnelRules
];
