/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const modules = {
  toolbar: [
    [
      'bold',
      'italic',
      'underline',
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
      // "strike",
      'blockquote'
    ],
    [{ font: [] }],
    // [{ size: [] }],
    [
      { align: ['', 'right', 'center', 'justify'] },
      { list: 'ordered' },
      { list: 'bullet' }
    ]
    // [
    //   'code',
    //   'link',
    //   'image'
    // ]
    // ["quill-emoji"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true
  }
  // imageResize: {
  //   displayStyles: {
  //     backgroundColor: 'black',
  //     border: 'none',
  //     color: 'white'
  //     // other camelCase styles for size display
  //   }
  // }
};

const formats = [
  // 'header',
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
  'align'
  // 'link',
  // 'image',
  // 'video',
  // 'code'
];
const headingModules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    // [{ size: ['16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '34px', '36px', '38px'] }],
    [
      'bold',
      'italic',
      'underline',
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
      }
    ],
    [
      { align: ['', 'right', 'center', 'justify'] }
    ]
  ]
};
const headingFormats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'color',
  'align'
];

export {
  formats,
  modules,
  headingFormats,
  headingModules
};

