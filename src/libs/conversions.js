import { getPriceFormat } from './currencies';
import { getCountryByCode } from 'libs';

export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  // eslint-disable-next-line
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return (`${Math.round(bytes / (1024 ** i), 2)} ${sizes[i]}`);
};


export const downloadCSV = (fileName, dataRows) => {
  const download = document.createElement('a');
  const fileHref = `data:text/csv;charset=utf-8,${encodeURIComponent(dataRows)}`;
  download.setAttribute('href', fileHref);
  download.setAttribute('download', fileName);
  download.click();
};


export const getTextContentFromTextNode = (htmlText) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlText;

  return wrapper.textContent;
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  const str = s.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const friendlyMessage = (msg) => msg;

export const formatLanguage = (language) => language.contexts.reduce((lang, context) => {
  lang[context.key] = context.words.reduce((words, word) => {
    words[word.key] = word.value;
    return words;
  }, {});
  return lang;
}, { type: language.type || 'ltr' });


export const exportOrdersToCsv = (orders, { paymentType: filterPayment }) => {
  const titles = 'Name,Email Address,Phone Number,Product Name,Payment Processor,Offer Included,Coupon Used,Coupon Discount,Total Charge,Product Payment Type';
  const shippingDetialsTitles = ',Address, Second Address, City, State, Postal Code,  Country';
  let hasShippingDetialsInProducts = false;

  const orderProducts = orders.reduce((products, { products: subProducts, ...order }) => {
    const nestedProducts = filterPayment
      ? subProducts.filter((product) => product.payment && product.payment.paymentType === filterPayment)
      : subProducts;

    return [...products, ...nestedProducts.map((product) => ({ product, ...order }))];
  }, []);
  const convertToCSVFormat = orderProducts
    .map(({
      customer: {
        firstName,
        lastName,
        email,
        phoneNumber
      },
      currency,
      totalCharge,
      shippingDetails: {
        streetAddress,
        streetAddressLine2,
        city,
        state,
        postalCode,
        country
      } = {},
      product: {
        name: productName,
        offer: { name: offerName = 'No', price: offerPrice = 0 } = {},
        coupon: { code = '- -', CouponDiscount = 0 } = {},
        // price: { amount: chargeAmount } = {},
        payment: {
          paymentType,
          paymentMethod
        } = {}
      } = {}
    }) => {

      let basicOrderRow = `${firstName} ${lastName},${email},${phoneNumber},${productName},${paymentMethod},${offerName} - ${offerPrice},${code},${CouponDiscount},${getPriceFormat(totalCharge, currency)},${paymentType}`;

      const shippingDetialsRow = `,"${streetAddress}","${streetAddressLine2}","${city}","${state}",${postalCode},"${getCountryByCode(country)}"`;

      if (streetAddress && streetAddressLine2 && city) {
        basicOrderRow += shippingDetialsRow;
        hasShippingDetialsInProducts = true;
      }

      return basicOrderRow;
    })
    .join('\n');

  return `${titles + (hasShippingDetialsInProducts ? shippingDetialsTitles : '')}\n ${convertToCSVFormat}`;
};
