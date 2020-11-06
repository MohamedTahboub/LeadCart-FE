import ids from 'shortid';
import html2canvas from 'html2canvas';

export default async (elementId, { quality = 0.20, fileName } = {}) => {
  const target = document.getElementById(elementId);
  if (!target) return;
  const canvas = await html2canvas(target, {
    // useCORS: false,
    // allowTaint: true
  });

  const dataURL = canvas.toDataURL('image/jpeg', quality);

  return dataURItoBlob(dataURL, fileName);
};

function dataURItoBlob (dataURI, fileName) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);


  let theFileName = fileName;
  if (!theFileName)
    theFileName = ids.generate();
  // New Code
  const imageBlob = new Blob([ab], { type: mimeString });
  return new File([imageBlob], `${theFileName}.jpeg`);

}
