const firstTemplateImage = 'https://i.imgur.com/K0q8SaC.png';
// const secondTemplateImage = 'https://i.imgur.com/9p6XdWM.png';
// const thirdTemplateImage = 'https://i.imgur.com/bS3Xzde.png';
// const fourthTemplateImage = 'https://i.imgur.com/qwROHQZ.png';

const bookTemplateImage = 'https://i.imgur.com/wFxouJh.png';
const courseTemplateImage = 'https://i.imgur.com/EA0zeV4.png';
const beautyToolTemplateImage = 'https://i.imgur.com/wRWcvbA.png';
const headsetsTemplateImage = 'https://i.imgur.com/CP4FJcY.png';

export default [
  {
    id: 'bookTemplate',
    name: 'Book Template',
    image: bookTemplateImage,
    body: {
      shippingDetails: { enabled: false },
      coupons: {
        enabled: false,
        list: []
      },
      custom: {
        billingAddress: false,
        couponSection: false,
        orderSummary: false,
        shippingDetails: true
      },
      sections: [
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h1 class="ql-align-center"><span class="ql-size-large" style="color: rgb(255, 255, 255);">Design Thinking Strategic Innovation</span></h1>',
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
          _id: '5fa44bb6f76a910023de04ea'
        },
        {
          hidden: false,
          type: 'image',
          content: {
            children: [],
            value: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/design_thinking_removebg_preview.png'
          },
          styles: {
            height: 366.5,
            width: 688,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa44bb6f76a910023de04eb'
        },
        {
          hidden: false,
          type: 'button',
          content: {
            value: '       Buy Now For $9.84       ',
            children: [],
            image: '/static/media/nested-section-blank.03c573d1.png'
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: 'rgba(234,196,46,1)',
            foregroundColor: 'rgba(255,255,255,1)',
            borderSymmetry: true,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderStyle: 'solid',
            position: 'center'
          },
          parentZone: 'first-column',
          _id: '5fa44bb6f76a910023de04ec'
        },
        {
          hidden: false,
          type: 'spacer',
          content: {
            value: 'Click Here',
            children: []
          },
          styles: {
            height: 76,
            width: '100%',
            padding: '10px'
          },
          parentZone: 'first-column',
          _id: '5fa44bb6f76a910023de04ed'
        },
        {
          hidden: false,
          type: 'text',
          content: {
            value: '<p><strong class="ql-size-large">At last, a book that shows you how to build design a life you can thrive in, at any age or stage</strong></p><p><br></p><p><span class="ql-size-large">Designers create worlds and solve problems using design thinking. Look around your office or home–at the tablet or smartphone you may be holding or the chair you are sitting in. Everything in our lives was designed by someone. And every design starts with a problem that a designer or team of designers seeks to solve.</span></p>',
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
          _id: '5fa44bb6f76a910023de04ee'
        },
        {
          hidden: false,
          type: 'spacer',
          content: {
            value: 'Click Here',
            children: []
          },
          styles: {
            height: 85,
            width: '100%',
            padding: '10px'
          },
          parentZone: 'first-column',
          _id: '5fa44bb6f76a910023de04ef'
        },
        {
          hidden: false,
          type: 'testimonialsSection',
          content: {
            title: 'Testimonials List',
            list: [
              {
                author: 'Michael C.',
                content: '"We\'ve been able to increase our conversion rate to about 27% which I think is pretty\n          solid."',
                authorAvatar: 'https://leadcart.io/assets/images/testimonial-4.png'
              }
            ],
            author: 'Muriel Esposito',
            image: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/5dfa061684a05.png',
            value: 'There are many of Lorem Ipsum available, form, by injected humour.',
            children: [],
            rank: 5,
            authorDescription: 'Copywriter'
          },
          styles: { theme: 'compact' },
          parentZone: 'first-column',
          _id: '5fa44bb6f76a910023de04f0'
        },
        {
          hidden: false,
          type: 'checkoutSection',
          content: {
            value: 'StaticSections',
            twoStepCheckout: true
          },
          styles: {
            theme: 'futuristic',
            themeColor: 'rgba(81,81,81,1)',
            backgroundColor: 'rgba(251,250,255,1)',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            hasShadow: true,
            shadowColor: 'rgba(0,0,0,0.28)',
            boxShadowOffsetX: 1,
            boxShadowOffsetY: 1,
            boxShadowBlur: 5
          },
          parentZone: 'second-column',
          texts: { orderBtn: 'Continue to Payment' },
          _id: '5fa44664f76a910023de04a1'
        }
      ],
      _id: '5fa44664f76a910023de04a0',
      name: 'Design Thinking Product',
      category: 'checkout',
      brand: '5e734bfe183e50569712755e',
      pricingOptions: [],
      internalName: 'bookTemplate',
      createdAt: '2020-11-05T18:37:24.434Z',
      updatedAt: '2020-11-05T19:08:41.083Z',
      __v: 0,
      pageStyles: {
        layout: 'two-column',
        pageBackgroundSettings: {
          firstSectionBackground: {
            backgroundImage: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/path_388%20%281%29.png',
            backgroundType: 'image'
          }
        },
        productPage: {
          backgroundColor: 'rgba(34,25,77,0)',
          firstColumn: { width: 610 },
          secondColumn: { width: 646 },
          marginTop: 63
        },
        showHead: false
      },
      thumbnail: 'https://i.imgur.com/wFxouJh.png'
    }
  },
  {
    id: 'courseTemplate',
    name: 'Course Template',
    image: courseTemplateImage,
    body: {
      internalName: 'courseTemplate',
      shippingDetails: { enabled: false },
      custom: {
        billingAddress: true,
        couponSection: false,
        orderSummary: false,
        shippingDetails: false
      },
      sections: [
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h2><span style="color: rgb(68, 68, 68);">Programming for Everybody </span></h2><h2><span class="ql-size-large" style="color: rgb(68, 68, 68);">(Getting Started with Python)</span></h2>',
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
          _id: '5fa438f5f76a910023de0411'
        },
        {
          hidden: false,
          type: 'image',
          content: {
            children: [],
            value: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/group_5248.png'
          },
          styles: {
            height: 267,
            width: 688,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa438f5f76a910023de0412'
        },
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h2><span style="color: rgb(102, 185, 102);">✓</span>Course Feature one<span style="color: rgb(68, 68, 68);">.</span></h2><p><br></p><h2><span style="color: rgb(102, 185, 102);">✓</span>Course Feature Two.&nbsp;</h2><p><br></p><h2><span style="color: rgb(102, 185, 102);">✓</span>Course Feature Three<span style="color: rgb(68, 68, 68);">.</span></h2><p><br></p><h2><span style="color: rgb(102, 185, 102);">✓</span>Course Feature Four.&nbsp;</h2>',
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
          _id: '5fa438f5f76a910023de0413'
        },
        {
          hidden: false,
          type: 'text',
          content: {
            value: '<p><strong class="ql-size-large">What Our student say about us?</strong></p>',
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
          _id: '5fa438f5f76a910023de0414'
        },
        {
          hidden: false,
          type: 'testimonialsSection',
          content: {
            title: 'Testimonials List',
            list: [
              {
                author: 'Michael C.',
                content: '"We\'ve been able to increase our conversion rate to about 27% which I think is pretty\n          solid."',
                authorAvatar: 'https://leadcart.io/assets/images/testimonial-4.png'
              }
            ],
            author: 'Michael C.',
            image: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/0_wQfdMtYJ9Uc4ZXMp.jpg',
            value: '"I am very impressed with all the features of this course. It has made testimonial collection and sharing so easy for us and our students, Highly recommend!"',
            children: [],
            rank: 5,
            authorDescription: 'Senior Engineer, University of San Diego'
          },
          styles: { theme: 'compact' },
          parentZone: 'first-column',
          _id: '5fa438f5f76a910023de0415'
        },
        {
          hidden: false,
          type: 'checkoutSection',
          content: {
            value: 'StaticSections',
            twoStepCheckout: true
          },
          styles: {
            theme: 'futuristic',
            backgroundColor: 'rgba(255,255,255,1)',
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            hasShadow: true,
            shadowColor: 'rgba(25,24,24,0.09)',
            boxShadowOffsetX: 1,
            boxShadowOffsetY: 2,
            boxShadowBlur: 13,
            themeColor: 'rgba(11,184,212,1)',
            marginTop: 11
          },
          parentZone: 'second-column',
          _id: '5fa4354df76a910023de03d8'
        }
      ],
      pageStyles: {
        layout: 'two-column',
        productPage: {
          backgroundColor: 'rgba(246,249,251,1)',
          firstColumn: { marginRight: 34 },
          secondColumn: { width: 646 },
          marginTop: 79
        },
        widthMode: 'wide',
        showHead: false,
        pageBackgroundSettings: { firstSectionBackground: { backgroundColor: 'rgba(255,255,255,1)' } }
      },
      thumbnail: 'https://i.imgur.com/EA0zeV4.png'
    }
  },
  {
    id: 'firstTemplate',
    name: 'First Template',
    image: firstTemplateImage,
    body: {
      internalName: 'firstTemplate',
      shippingDetails: { enabled: false },
      coupons: {
        enabled: false,
        list: []
      },
      custom: {
        couponSection: false,
        orderSummary: false,
        shippingDetails: true,
        billingAddress: false
      },
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
          styles: {
            theme: 'futuristic',
            backgroundColor: 'rgba(255,255,255,1)',
            hasShadow: true,
            shadowColor: 'rgba(20,10,10,0.06)',
            boxShadowBlur: 7,
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
            borderBottomLeftRadius: 13,
            borderBottomRightRadius: 14
          },
          _id: '5fa18d2294ef4b002353b2b8'
        }
      ],
      pageStyles: {
        layout: 'two-column',
        productPage: {
          backgroundColor: 'rgba(242,246,249,1)',
          firstColumn: { width: 430 },
          marginTop: 69,
          paddingBottom: 60,
          paddingTop: 56,
          secondColumn: {
            marginLeft: 41,
            width: 646
          }
        },
        widthMode: 'wide',
        pageBackgroundSettings: { firstSectionBackground: { backgroundColor: 'rgba(255,255,255,1)' } },
        showHead: false
      },
      thumbnail: firstTemplateImage
    }
  },
  {
    id: 'beautyToolTemplate',
    name: 'Facial Brush Cleansing',
    image: beautyToolTemplateImage,
    body: {
      internalName: 'beautyToolTemplate',
      shippingDetails: { enabled: false },
      coupons: {
        enabled: false,
        list: []
      },
      custom: {
        couponSection: false,
        orderSummary: false,
        shippingDetails: true,
        billingAddress: false
      },
      sections: [
        {
          hidden: false,
          type: 'button',
          content: {
            value: 'FOREO',
            children: [],
            image: '/static/media/nested-section-blank.03c573d1.png'
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            position: 'left',
            backgroundColor: 'rgba(223,29,120,1)'
          },
          parentZone: 'first-column',
          _id: '5fa1978294ef4b002353b323'
        },
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h2><span style="color: rgb(68, 68, 68);">LUNA 2 Facial Cleansing Brush</span></h2>',
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
          _id: '5fa1978294ef4b002353b324'
        },
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h1><strong class="ql-size-large" style="color: rgb(240, 102, 102);">$199</strong></h1>',
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
          _id: '5fa1978294ef4b002353b325'
        },
        {
          hidden: false,
          type: 'image',
          content: {
            children: [],
            value: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/group_5237.png'
          },
          styles: {
            height: 354.5,
            width: 688,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa1978294ef4b002353b326'
        },
        {
          hidden: false,
          type: 'image',
          content: {
            children: [],
            value: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/dmuza2q4_202003161813534031.png'
          },
          styles: {
            height: 47,
            width: 688,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'first-column',
          _id: '5fa1978294ef4b002353b327'
        },
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h2>Authorized Retailer of FOREO</h2><p><u style="color: rgb(0, 102, 204);">Learn More</u></p>',
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
          _id: '5fa1978294ef4b002353b328'
        },
        {
          hidden: false,
          type: 'checkoutSection',
          content: {
            value: 'StaticSections',
            twoStepCheckout: true
          },
          parentZone: 'second-column',
          styles: {
            theme: 'futuristic',
            themeColor: 'rgba(223,29,120,1)',
            backgroundColor: 'rgba(255,255,255,1)',
            hasShadow: true,
            boxShadowBlur: 6,
            shadowColor: 'rgba(74,74,74,0.04)',
            boxShadowOffsetX: 8,
            boxShadowOffsetY: 5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 11,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          },
          _id: '5fa1924d94ef4b002353b2f0'
        }
      ],
      pageStyles: {
        layout: 'two-column',
        productPage: {
          secondColumn: { width: 638 },
          backgroundColor: 'rgba(34,25,77,0)',
          marginTop: 67
        },
        pageBackgroundSettings: { firstSectionBackground: { backgroundColor: 'rgba(242,246,249,1)' } },
        showHead: false
      },
      thumbnail: 'https://i.imgur.com/wRWcvbA.png'
    }
  },
  {
    id: 'headsetsTemplate',
    name: 'Beats EP Headphones',
    image: headsetsTemplateImage,
    body: {
      internalName: 'headsetsTemplate',
      shippingDetails: { enabled: false },
      custom: {
        couponSection: false,
        orderSummary: false,
        shippingDetails: true,
        billingAddress: false
      },
      sections: [
        {
          hidden: false,
          type: 'heading',
          content: {
            value: '<h2><strong class="ql-size-large" style="color: rgb(255, 255, 255);">BEATS EP Headphones</strong></h2><p><u style="color: rgb(255, 255, 255);">                  </u></p><p><br></p><p><br></p><h2><span style="color: rgb(255, 255, 255);">✓On-ear headphones: rests on the ear.</span></h2><h2><span style="color: rgb(255, 255, 255);">✓Compatible with iPhone.</span></h2><h2><span style="color: rgb(255, 255, 255);">✓Features a microphone, remote &amp; volume control.</span></h2><h2><span style="color: rgb(255, 255, 255);">✓Single-sided cable.</span></h2>',
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
          parentZone: 'second-column',
          _id: '5fa196fd94ef4b002353b315'
        },
        {
          hidden: false,
          type: 'image',
          content: {
            children: [],
            value: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/u_10152165_removebg_preview.png'
          },
          styles: {
            height: 459.5,
            width: 688,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          parentZone: 'second-column',
          _id: '5fa196fd94ef4b002353b316'
        },
        {
          hidden: false,
          type: 'checkoutSection',
          content: {
            value: 'StaticSections',
            twoStepCheckout: true
          },
          parentZone: 'first-column',
          styles: {
            theme: 'futuristic',
            themeColor: 'rgba(208,2,27,1)',
            backgroundColor: 'rgba(255,255,255,1)',
            borderTopLeftRadius: 9,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 8,
            hasShadow: true,
            shadowColor: 'rgba(0,0,0,0.39)',
            boxShadowBlur: 13,
            marginTop: 0
          },
          _id: '5fa194d794ef4b002353b30d'
        }
      ],
      pageStyles: {
        layout: 'two-column',
        pageBackgroundSettings: {
          firstSectionBackground: {
            backgroundImage: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/Rectangle%20786.png',
            backgroundType: 'image'
          }
        },
        productPage: {
          backgroundColor: 'rgba(34,25,77,0)',
          firstColumn: { width: 675 },
          secondColumn: { width: 499 },
          marginTop: 77
        },
        showHead: false
      },
      thumbnail: 'https://i.imgur.com/CP4FJcY.png'
    }
  }
];
