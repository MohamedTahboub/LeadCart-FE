import ids from 'shortid';

export const invalidFormat = 'Please, enter a valid codes format, each line one code, and codes should not has spaces';
export const invalidFileFormat = 'Please, select a valid csv file format, codes should be in one headless column of codes, checkout the sample file';
export const isValidCodeList = (codes) => {
  if (codes.length) {
    const list = codes.map((code) => code.trim());
    const doesAnyCodeHasSpaces = list.find((code) => code.includes(' '));
    return !doesAnyCodeHasSpaces;
  } else {return false;}
};
export const prepareCodesList = (codes) => {
  return codes.map((code) => code.replace(/,/g, '').trim()).filter(Boolean);
};
export const prepareForDisplay = (codes = []) => {
  return codes.join('\n');
};
export const handleFile = async (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const { result = '' } = e.target;
      const codes = result.split('\n');
      if (isValidCodeList(codes))
        res(codes);
      else
        rej(new Error(invalidFileFormat));
    };
    reader.readAsText(file);
  });
};
export const generateRandomCodes = () => {
  const randomLength = Math.floor(Math.random() * 10) * 10;
  return Array(randomLength).fill().map(() => ids.generate()).join('\n');
};
