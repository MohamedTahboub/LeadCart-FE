import guaranteeBadge1 from 'assets/images/guaranteeBadges/gur-1.png';

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
  heading: {
    hidden: false, // for referencing elements for the layout sections
    type: 'heading',
    content: {
      value: '<h2>Heading Content</h2>',
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
  button: {
    hidden: false, // for referencing elements for the layout sections
    type: 'button',
    content: {
      value: 'Click Here',
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
  spacer: {
    hidden: false, // for referencing elements for the layout sections
    type: 'spacer',
    content: {
      value: 'Click Here',
      children: [],
    },
    styles: {
      height: 30,
      width: '100%',
      padding: '10px'
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
          author: 'Michael C.',
          content: `"We've been able to increase our conversion rate to about 27% which I think is pretty
          solid."`,
          authorAvatar: 'https://leadcart.io/assets/images/testimonial-4.png'
        }
      ],
      value: 'testimonials Section Content',
      children: [],
    },
    styles: {
      theme: 'modern'
    },
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
      badge: guaranteeBadge1,
      title: 'Your Satisfaction',
      description: 'Customer satisfaction our top priority and our products are results-driven & designed to ensure customers\' needs fulfilling'
    },
    styles: {
      theme: 'right-theme',
    },
  },
  countDownWidget: {
    hidden: false, // for referencing elements for the layout sections
    type: 'countDownWidget',
    content: {
      valueType: 'fixedTime',
      value: {
        date: Date.now() + 1000000
      },
      children: [],
    },
    styles: {
      theme: 'formal-circles'
    },
  },
  progressbarWidget: {
    hidden: false, // for referencing elements for the layout sections
    type: 'progressbarWidget',
    content: {
      value: 93,
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
  productMarkWidget: {
    hidden: false, // for referencing elements for the layout sections
    type: 'productMarkWidget',
    content: {
      // value: 'bookmark Widget Section Content',
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
