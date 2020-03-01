export default {


  text: {
    hidden: false, // for referencing elements for the layout sections
    type: 'text',
    content: {
      value: 'Text Content',
      children: [],
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  image: {
    hidden: false, // for referencing elements for the layout sections
    type: 'image',
    content: {
      // value: 'https://via.placeholder.com/200',
      children: [],
    },
    styles: {
      height: 267,
      width: 688,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  video: {
    hidden: false, // for referencing elements for the layout sections
    type: 'video',
    content: {
      value: 'https://fast.wistia.com/embed/m6b92iiggl',
      children: [],
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  layout: {
    hidden: false, // for referencing elements for the layout sections
    type: 'layout',
    content: {
      value: 'Layout Content',
      children: [],
      sections: [
        {
          id: 'abc',
          hidden: false, // for referencing elements for the layout sections
          type: 'text',
          content: {
            value: 'Text Content',
            children: [],
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
        {
          id: 'abcd',
          hidden: false, // for referencing elements for the layout sections
          type: 'image',
          content: {
            value: 'https://via.placeholder.com/200',
            children: [],
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }
        }
      ]
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  bumpOffer: {
    hidden: false, // for referencing elements for the layout sections
    type: 'bumpOffer',
    content: {
      value: 'bumpOffer Content',
      children: [],
    },
    styles: {
      marginTop: 20,
      marginBottom: 20,
      paddingTop: 20,
      paddingBottom: 20,
      containerBackground: '#fff',
      containerTextColor: '#000',
      headerBackground: 'rgb(142, 209, 252)',
      borderColor: 'rgb(142, 209, 252)',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 5,
    },
  },
  shippingDetails: {
    hidden: false, // for referencing elements for the layout sections
    type: 'shippingDetails',
    content: {
      value: 'shipping Details Content',
      children: [],
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      themeColor: 'rgb(142, 209, 252)'
    },
  },
  couponSection: {
    hidden: false, // for referencing elements for the layout sections
    type: 'couponSection',
    content: {
      value: 'couponSection Content',
      children: [],
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 10,
      paddingBottom: 20,
    },
  },
  testimonialsSection: {
    hidden: false, // for referencing elements for the layout sections
    type: 'testimonialsSection',
    content: {
      title: 'Testimonials List',
      list: [
        {
          author: 'John Doe',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eligendi veritatis aliquid, explicabo exercitationem atque eveniet eos nobis.',
          authorAvatar: 'https://via.placeholder/100'
        },
        {
          author: 'Jane Doe',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eligendi veritatis aliquid, explicabo exercitationem atque eveniet eos nobis.',
          authorAvatar: 'https://via.placeholder/100'
        }
      ],
      value: 'testimonials Section Content',
      children: [],
    },
    styles: {},
  },
  featuresSection: {
    hidden: false, // for referencing elements for the layout sections
    type: 'featuresSection',
    content: {
      title: 'Features List Title',
      list: [
        { text: 'First Feature' },
        { text: 'Second Feature' },
        { text: 'Third Feature' },
      ]
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  guaranteeWidget: {
    hidden: false, // for referencing elements for the layout sections
    type: 'guaranteeWidget',
    content: {
      children: [],
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  countDownWidget: {
    hidden: false, // for referencing elements for the layout sections
    type: 'countDownWidget',
    content: {
      valueType: 'fixedTime',
      value: {
        date: Date.now() + 100000
      },
      children: [],
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  progressbarWidget: {
    hidden: false, // for referencing elements for the layout sections
    type: 'progressbarWidget',
    content: {
      value: 'progressbar Widget Section Content',
      children: [],
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  bookmarkWidget: {
    hidden: false, // for referencing elements for the layout sections
    type: 'bookmarkWidget',
    content: {
      value: 'bookmark Widget Section Content',
      children: [],
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  }
};
