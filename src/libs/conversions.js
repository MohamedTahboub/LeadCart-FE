
export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return (`${Math.round(bytes / (1024 ** i), 2)} ${sizes[i]}`);
};


export const downloadCSV = (fileName, dataRows) => {
  const download = document.createElement('a');
  const filehref = `data:text/csv;charset=utf-8,${encodeURIComponent(dataRows)}`;
  download.setAttribute('href', filehref);
  download.setAttribute('download', fileName);
  download.click();
}