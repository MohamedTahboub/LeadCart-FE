/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    [
      {
        color: [
          '#000000',
          '#e60000',
          '#ff9900',
          '#ffff00',
          '#008a00',
          '#0066cc',
          '#9933ff',
          '#ffffff',
          '#facccc',
          '#ffebcc',
          '#ffffcc',
          '#cce8cc',
          '#cce0f5',
          '#ebd6ff',
          '#bbbbbb',
          '#f06666',
          '#ffc266',
          '#ffff66',
          '#66b966',
          '#66a3e0',
          '#c285ff',
          '#888888',
          '#a10000',
          '#b26b00',
          '#b2b200',
          '#006100',
          '#0047b2',
          '#6b24b2',
          '#444444',
          '#5c0000',
          '#663d00',
          '#666600',
          '#003700',
          '#002966',
          '#3d1466',
          'custom-color'
        ]
      },
      'bold',
      'italic',
      'underline',
      // "strike",
      'blockquote'
    ],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { align: ['', 'right', 'center', 'justify'] }
    ],
    ['code', 'link', 'image']
    // ["quill-emoji"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true
  },
  imageResize: {
    displayStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white'
      // other camelCase styles for size display
    }
  },
  imageUploader: {
    upload: (file) => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png'
        );
      }, 3500);
    })
  }
};
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'color',
  'align',
  'link',
  'image',
  'video',
  'code'
];

export { formats, modules };

