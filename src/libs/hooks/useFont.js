import { useState } from 'react';

export default async ({ family: fontFamily, url } = {}) => {
  const [result, setResult] = useState(fontFamily);

  try {
    const fn = new FontFace(fontFamily, `url(${url})`);
    await fn.load().catch(console.error);
    window.document.fonts.add(fn);
    setResult(fontFamily);
  } catch (error) {
    console.log(error.message, error);
  }

  return result;
};
