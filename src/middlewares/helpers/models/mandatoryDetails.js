

export default [
  'name',
  'internalName',
  'url',
  'description',
  'image',
  { value: 'price', sub: ['amount', 'currancy'] },
  'tags'
];
