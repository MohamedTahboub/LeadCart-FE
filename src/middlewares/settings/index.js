import general from './general';
import domains from './domains';
import integrations from './integrations';
import invoicing from './invoicing';

export default [general, integrations, ...domains, ...invoicing];

