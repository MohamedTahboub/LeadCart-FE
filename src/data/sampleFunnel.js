export const basic = {
  products: [
    {
      category: 'checkout',
      elementId: 'DReko4TOC11',
      coordinates: {
        x: 338,
        y: 203,
        shiftX: 76,
        shiftY: 65,
        height: 180,
        width: 120
      },
      relations: [
        {
          target: 'B_T-2Pg1r11',
          coordinates: {
            x: 615,
            y: 207,
            shiftX: 60,
            shiftY: 88,
            height: 180,
            width: 120
          },
          type: 'upSell'
        }
      ]
    },
    {
      category: 'upsell',
      elementId: 'B_T-2Pg1r11',
      coordinates: {
        x: 615,
        y: 207,
        shiftX: 60,
        shiftY: 88,
        height: 180,
        width: 120
      },
      relations: [
        {
          target: 'tgILc-d1a11',
          coordinates: {
            x: 914,
            y: 209,
            shiftX: 59,
            shiftY: 80,
            height: 180,
            width: 120
          },
          type: 'upSell'
        }
      ]
    },
    {
      category: 'thankyoupage',
      elementId: 'tgILc-d1a11',
      coordinates: {
        x: 914,
        y: 209,
        shiftX: 59,
        shiftY: 80,
        height: 180,
        width: 120
      },
      relations: []
    }
  ],
  thumbnail: 'https://s3.us-east-2.amazonaws.com/assets.leadcart.io/5d3bd34e97d3ea503e8659af/products/funnelDemoFlow.png'
};
