import * as yup from 'yup';
yup.addMethod(yup.string, 'couponCode', function (key) {
  return this.test(
    'equals',
    'don\'t include these characters [&+,:;=?|\'<>.^*()%!-] or empty spaces',
    (value) => !(/([&+,:;=?|'<>.^*()%!-]|\ )/.test(value))
  );
});

yup.addMethod(yup.string, 'productUrl', function (key) {
  return this.test(
    'productUrl',
    'invalid product url',
    (value) => !(/([&+,:;=?|'<>.^*()%!-]|\ )/.test(value))
  );
});
yup.addMethod(yup.string, 'subDomain', function (key) {
  return this.test(
    'subDomain',
    'invalid subdomain name',
    (value) => !(/([&+,:;=?|'<>.^*()%!]|\ )/.test(value))
  );
});

