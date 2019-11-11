export const basic = {
  products: [{
    category: 'checkout',
    elementId: 'DReko4TOC11',
    coordinates: {
      x: 162, y: 225, shiftX: 35, shiftY: 55, height: 120, width: 75
    },
    relations: [{
      target: 'B_T-2Pg1r11',
      coordinates: {
        x: 384, y: 226, shiftX: 54, shiftY: 59, height: 120, width: 75
      },
      type: 'upSell'
    }]
  }, {
    category: 'upsell',
    elementId: 'B_T-2Pg1r11',
    coordinates: {
      x: 384, y: 226, shiftX: 54, shiftY: 59, height: 120, width: 75
    },
    relations: [{
      target: 'tgILc-d1a11',
      coordinates: {
        x: 608, y: 226, shiftX: 30, shiftY: 69, height: 120, width: 75
      },
      type: 'upSell'
    }]
  }, {
    category: 'thankyoupage',
    elementId: 'tgILc-d1a11',
    coordinates: {
      x: 608, y: 226, shiftX: 30, shiftY: 69, height: 120, width: 75
    },
    relations: []
  }],
  thumbnail: 'https://s3.us-east-2.amazonaws.com/static.leadcart.io/5d3bd34e97d3ea503e8659af/products/funnelDemoFlow.png'
};
