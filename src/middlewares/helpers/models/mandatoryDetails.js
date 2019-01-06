

export default [
  '_id',
  'name',
  'internalName',
  'url',
  'description',
  'image',
  { value: 'price', sub: ['amount', 'currancy'] },
  'tags',
  'available',
  'isActive'
];
