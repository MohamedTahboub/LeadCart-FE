import * as yup from 'yup';

yup.addMethod(yup.string, 'couponCode', function (key) {
  return this.test(
    'equals',
    'don\'t include these characters [&+,:;=?|\'<>.^*()%!-] or empty spaces',
    // eslint-disable-next-line
    (value) => !(/([&+,:;=?|'<>.^*()%!-]|\ )/.test(value))
  );
});

yup.addMethod(yup.string, 'productUrl', function (key) {
  return this.test(
    'productUrl',
    'invalid product url',
    // eslint-disable-next-line
    (value) => !(/([&+,:;=?|'<>.^*()%!-]|\ )/.test(value))
  );
});

yup.addMethod(yup.string, 'subDomain', function (key) {
  return this.test(
    'subDomain',
    'invalid subdomain name',
    // eslint-disable-next-line
    (value) => !(/([&+,:;=?|'<>.^*()%!]|\ )/.test(value))
  );
});

yup.addMethod(yup.string, 'promoCode', function () {
  return this.test(
    'promoCode',
    'don\'t include these characters [&+,:;=?|\'<>.^*()%!] or empty spaces',
    // eslint-disable-next-line
    (value) => !(/([&+,:;=?|'<>.^*()%!]|\ )/.test(value))
  );
});

yup.addMethod(yup.mixed, 'remove', () => {
  return yup.mixed().transform(() => undefined);
});
