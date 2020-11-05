const firstTemplateImage = 'https://i.imgur.com/MTWlfAG.png';
const secondTemplateImage = 'https://i.imgur.com/9p6XdWM.png';
const thirdTemplateImage = 'https://i.imgur.com/bS3Xzde.png';
const fourthTemplateImage = 'https://i.imgur.com/qwROHQZ.png';


export default [
  {
    id: 'firstTemplate',
    name: 'First Template',
    image: firstTemplateImage,
    body: {
      internalName: 'firstTemplate',
      thumbnail: firstTemplateImage,
      sections: [
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h2 class="ql-align-center"><strong class="ql-font-Ubuntu" style="color: rgb(102, 185, 102);">Apple Watch</strong></h2>',
            children: []
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa18f7894ef4b002353b2c8'
        },
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h2 class="ql-align-center"><strong style="color: rgb(45, 61, 104);">Gold Aluminum Case with </strong></h2><h2 class="ql-align-center"><strong style="color: rgb(45, 61, 104);">Solo Loop</strong></h2>',
            children: []
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa18f7894ef4b002353b2c9'
        },
        {
          hidden: false,
          type: 'image',
          content: {
            children: [],
            value: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/myw62_vw_34fr_watch_44_alum_gold_nc_6s_vw_34fr_wf_co_removebg_preview.png'
          },
          styles: {
            height: 323.5,
            width: 688,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa18f7894ef4b002353b2ca'
        },
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h1 class="ql-align-center"><strong style="background-color: rgb(204, 224, 245); color: rgb(45, 61, 104);">$315.00</strong></h1>',
            children: []
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa18f7894ef4b002353b2cb'
        },
        {
          hidden: false,
          type: 'spacer',
          content: {
            value: 'Click Here',
            children: []
          },
          styles: {
            height: 39,
            width: '100%',
            padding: '10px'
          },
          parentZone: 'first-column',
          _id: '5fa18f7894ef4b002353b2cc'
        },
        {
          hidden: false,
          type: 'image',
          content: {
            children: [],
            value: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/group_158.png'
          },
          styles: {
            height: 35,
            width: 688,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa18f7894ef4b002353b2cd'
        },
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h2 class="ql-align-center"><span style="color: rgb(68, 68, 68);">100% Genuine Brands</span></h2>',
            children: []
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa18f7894ef4b002353b2ce'
        },
        {
          hidden: false,
          type: 'checkoutSection',
          content: {
            value: 'StaticSections',
            twoStepCheckout: true
          },
          parentZone: 'second-column',
          styles: { theme: 'futuristic' },
          _id: '5fa18d2294ef4b002353b2b8'
        }
      ],
      category: 'checkout',
      pageStyles: {
        layout: 'two-column',
        productPage: {
          backgroundColor: 'rgba(242,246,249,1)',
          firstColumn: { width: 650 },
          marginTop: 0,
          paddingBottom: 60,
          paddingTop: 56,
          secondColumn: {
            marginLeft: 41,
            width: 646
          }
        }
      }
    }
  },
  {
    id: 'secondTemplate',
    name: 'Second Template',
    image: secondTemplateImage,
    body: {}
  },
  {
    id: 'thirdTemplate',
    name: 'Third Template',
    image: thirdTemplateImage,
    body: {}
  },
  {
    id: 'fourthTemplate',
    name: 'Fourth Template',
    image: fourthTemplateImage,
    body: {}
  }
];
