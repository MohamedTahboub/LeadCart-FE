import * as immutable from 'object-path-immutable';


const toCsvRowFormat = (list) => list.join(',');
const convertToCsv = (data, schema) => {
  const { titles, rowKeys } = Object.entries(schema)
    .reduce(({ titles, rowKeys }, [title, key]) => {
      // should check if already exists
      titles.push(title);
      rowKeys.push(key);
      return { titles, rowKeys };
    }, { titles: [], rowKeys: [] });
  console.log({ titles, rowKeys });
  const rows = data.map((row) => {
    return rowKeys.map((key) => immutable.get(row, key, ''));
  });
  const rowsRawData = rows.map(toCsvRowFormat).join('\n');
  const titleRawData = toCsvRowFormat(titles);

  return `${titleRawData}\n${rowsRawData}`;
};

export const prepareAndExportToCSV = ({ fileName, rows, schema }) => {
  const csvRawText = convertToCsv(rows, schema);
  downloadFile({
    fileName,
    data: csvRawText
  });
};

export const downloadFile = ({ fileName = 'File Name.txt', data, url }) => {
  const download = document.createElement('a');
  const fileHref = url ? url : `data:text/csv;charset=utf-8,${encodeURIComponent(data)}`;
  download.setAttribute('href', fileHref);
  download.setAttribute('download', fileName);
  download.click();
};
