export const initialColorList = [
  'rgba(244, 67, 54, 1)',
  'rgba(233, 30, 99, 1)',
  'rgba(156, 39, 176, 1)',
  'rgba(103, 58, 183, 1)',
  'rgba(63, 81, 181, 1)',
  'rgba(33, 150, 243,1)',
  'rgba(3, 169, 244, 1)',
  'rgba(0, 188, 212, 1)',
  'rgba(0, 150, 136, 1)',
  'rgba(76, 175, 80, 1)',
  'rgba(139, 195, 74, 1)',
  'rgba(205, 220, 57, 1)',
  'rgba(255, 235, 59, 1)',
  'rgba(255, 193, 7, 1)'
];


export const data = (defaultValue = '#0693E3', colorList = initialColorList) => ({
  el: '.color-picker',
  theme: 'nano',

  swatches: colorList,
  default: defaultValue !== '#FFFFFF' ? defaultValue : '#0693e3',


  components: {
    hue: true,
    interaction: {
      input: true,
      save: true
      // cancel: true
    }

  },
  i18n: { 'btn:save': 'Reset' }
});

