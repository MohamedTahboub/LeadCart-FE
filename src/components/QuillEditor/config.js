import ReactQuill from 'react-quill';
const Font = ReactQuill.Quill.import('formats/font');
const supportedFontFamilyList = [
  'Raleway',
  'Roboto',
  'Modak',
  'Dancing',
  'Merriweather',
  'Courier',
  'Cairo',
  'Helvetica',
  'Ubuntu'
];

Font.whitelist = supportedFontFamilyList;
ReactQuill.Quill.register(Font, true);

const modules = {
  toolbar: [
    [
      'bold',
      'italic',
      'underline',
      'strike',
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
      {
        background: [
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
          'custom-color'
        ]
      },
      'blockquote'
    ],
    [{ size: [] }],
    [{ font: supportedFontFamilyList }],
    [
      { align: ['', 'right', 'center', 'justify'] },
      { list: 'ordered' },
      { list: 'bullet' }
    ]
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
  'background',
  'align',
  'link'
];
const headingModules = {
  toolbar: [
    [{ header: 1 }, { header: 2 }],
    [{ size: [] }],
    [
      'bold',
      'italic',
      'underline',
      'strike',
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
      {
        background: [
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
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'color',
  'background',
  'align',
  'strike'
];

export {
  formats,
  modules,
  headingFormats,
  headingModules
};

