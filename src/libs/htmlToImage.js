import ids from 'shortid';
import html2canvas from 'html2canvas';

export default async (elementId, { quality = 0.02, fileName } = {}) => {
  const target = document.getElementById(elementId);
  if (!target) return;
  const canvas = await html2canvas(target, {
    useCORS: false
    // allowTaint: true
  });
  const croppedCanvas = cropCanvas(canvas, 0, 0, canvas.width, 700);
  const dataURL = croppedCanvas.toDataURL('image/jpeg', quality);

  return dataURItoBlob(dataURL, fileName);
};

const cropCanvas = (sourceCanvas, left, top, width, height) => {
  const destCanvas = document.createElement('canvas');
  destCanvas.width = width;
  destCanvas.height = height;
  destCanvas
    .getContext('2d')
    // source rect with content to crop
    // newCanvas, same size as source rect
    .drawImage(sourceCanvas, left, top, width, height, 0, 0, width, height);
  return destCanvas;
};

// function cropCanvas(canvas, options = {}) {
//   const { maxHeight, type, quality = {} } = options;
//   const toCropCanvas = document.createElement('canvas');
//   const toCropCanvasCtx = toCropCanvas.getContext('2d');
//   toCropCanvas.width = canvas.width;
//   toCropCanvas.height = canvas.height > maxHeight ? maxHeight : canvas.height;
//   toCropCanvasCtx.drawImage(canvas, 0, 0);
//   return toCropCanvas.toDataUR(type, quality);
// }

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
