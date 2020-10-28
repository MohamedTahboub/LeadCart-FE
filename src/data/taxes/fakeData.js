export default [
  {
    name: 'Tax1',
    appliesTo: 'Subtotal', // or SubtotalAndShipping
    zoneDefinition: 'IPAddress', // or ShippingAddress
    enabled: true, //or 0 => 1 means enabled, 0 means disabled
    _id: 5,
    ratesPerZone: [
      {
        name: 'Asia',
        countries: ['CD', 'EG'], // and so on
        _id: 'mongoId4',
        rate: 19
      },
      {
        name: 'Africa',
        countries: ['ES', 'DE'], // and so on
        _id: 'mongoId2',
        rate: 18
      },
      {
        name: 'Oceania',
        countries: ['FI', 'GL'], // and so on
        _id: 'mongoId3',
        rate: 22
      }
    ]
  },

  {
    name: 'Tax2',
    appliesTo: 'SubtotalAndShipping', // or SubtotalAndShipping
    zoneDefinition: 'ShippingAddress', // or ShippingAddress
    enabled: false, //or 0 => 1 means enabled, 0 means disabled
    _id: 1,
    ratesPerZone: [
      {
        name: 'Zone 2',
        countries: ['CD', 'EG'], // and so on
        _id: 'mongoId4',
        rate: 19
      },
      {
        name: 'Zone 2',
        countries: ['ES', 'DE'], // and so on
        _id: 'mongoId2',
        rate: 18
      },
      {
        name: 'Zone 3',
        countries: ['FI', 'GL'], // and so on
        _id: 'mongoId3',
        rate: 22
      },
      {
        name: 'Zone 3',
        countries: ['IN', 'ML'], // and so on
        _id: 'mongoId4',
        rate: 9
      }
    ]
  },

  {
    name: 'Tax3',
    appliesTo: 'Subtotal', // or SubtotalAndShipping
    zoneDefinition: 'IPAddress', // or ShippingAddress
    enabled: true, //or 0 => 1 means enabled, 0 means disabled
    _id: 2,
    ratesPerZone: [
      {
        name: 'Zone 2',
        countries: ['CD', 'EG'], // and so on
        _id: 'mongoId4',
        rate: 19
      },
      {
        name: 'Zone 2',
        countries: ['ES', 'DE'], // and so on
        _id: 'mongoId2',
        rate: 18
      },
      {
        name: 'Zone 3',
        countries: ['FI', 'GL'], // and so on
        _id: 'mongoId3',
        rate: 22
      },
      {
        name: 'Zone 3',
        countries: ['IN', 'ML'], // and so on
        _id: 'mongoId4',
        rate: 9
      }
    ]
  },

  {
    name: 'Tax4',
    appliesTo: 'SubtotalAndShipping', // or SubtotalAndShipping
    zoneDefinition: 'ShippingAddress', // or ShippingAddress
    enabled: false, //or 0 => 1 means enabled, 0 means disabled
    _id: 3,
    ratesPerZone: [
      {
        name: 'Zone 2',
        countries: ['CD', 'EG'], // and so on
        _id: 'mongoId4',
        rate: 19
      },
      {
        name: 'Zone 2',
        countries: ['ES', 'DE'], // and so on
        _id: 'mongoId2',
        rate: 18
      },
      {
        name: 'Zone 3',
        countries: ['FI', 'GL'], // and so on
        _id: 'mongoId3',
        rate: 22
      },
      {
        name: 'Zone 3',
        countries: ['IN', 'ML'], // and so on
        _id: 'mongoId4',
        rate: 9
      }
    ]
  }


];
