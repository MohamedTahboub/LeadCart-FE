
const regexFilters = {
  email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  subdomain: /(?=^.{3,20}$)(?![_-].+)(?!.+[_-]$)(?!.*[_-]{2,})[^<>[\]{}|\\\/^~%.# :;,$%?\0-\cZ]+$/,
  url: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
  code: /^\S+$/,
  alphabet: /^[A-Za-z]/i
};
export const Rules = {
  isRequired: 'required',
  notEmpty: 'notEmpty',
  email: 'email',
  bool: 'boolean',
  url: 'url',
  isObject: 'isObject',
  isArray: 'isArray',
  subdomain: 'subdomain',
  isPromoCode: 'code',
  isNumber: 'isNumber',
  min: n => n
};


const validFormatter = (cond, message) => (!cond ? ({ valid: cond, message }) : ({ valid: cond }));

const containSpacesOrSpceialChar = (text = '') => !!text.match(/^([A-Za-z])+$/);


function validateField ({ fieldName, value }, rules) {
  value = value || '';
  const r = rules.map((rule) => {
    switch (rule) {
    case 'required': return validFormatter(value.trim() !== '', 'should not be empty');
    case 'email': return validFormatter(regexFilters.email.test(value), 'invalid email address');
    case 'subdomain': return validFormatter(regexFilters.subdomain.test(value), 'invalid subdomain name');
    case 'url': return validFormatter(value.trim() === '' || regexFilters.url.test(value), 'invalid url');
    case 'isObject': return validFormatter(typeof value === 'object', 'invalid value');
    case 'isArray': return validFormatter(Array.isArray(value), 'invalid array value');
    case 'bool': return validFormatter(!!value === value, 'invalid Boolean value');
    case 'code': return validFormatter(regexFilters.code.test(value.trim()), 'code format does not include spaces');
    case 'isNumber': return validFormatter(Number.isInteger(value), 'should be a Number');
    case 'alphabet': return validFormatter(containSpacesOrSpceialChar(value), 'invalid format');
    case 6 : return validFormatter(value.trim().length >= 6 , 'should be more then 6 characters')
    default: return false;
    }
  })
    .find((f) => !f.valid);
  return { ...r, field: fieldName };
}


export const Vaidator = (form, formRules) => {
  // console.log(form);
  // console.log(formRules);
  if(!form) return 'should not be empty'
  const result = Object.keys(formRules)
    .map((fieldName) => validateField({ fieldName, value: form[fieldName] }, formRules[fieldName]))
    .filter((e) => e.valid === false);
  return result.length
    ? result.reduce((fieldsObj, { field, message }) => ({ ...fieldsObj, [field]: message }), {})
    : false;
};
