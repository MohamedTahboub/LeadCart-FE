

export default [
  'description',
  'image',
  'internalName',
  'name',
  { value: 'payment', sub: ['recurringPeriod', 'type'] },
  { value: 'price', sub: ['amount'] },
  'productFiles',
  'tags',
  'url'
];
