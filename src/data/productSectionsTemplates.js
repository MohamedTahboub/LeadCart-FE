import ids from 'shortid';
import guaranteeBadge1 from 'assets/images/guaranteeBadges/gur-1.png';


export default {
  text: {
    hidden: false,
    type: 'text',
    content: {
      value: 'Text Content',
      children: []
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  heading: {
    hidden: false,
    type: 'heading',
    content: {
      value: '<h2>Heading Content</h2>',
      children: []
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  button: {
    hidden: false,
    type: 'button',
    content: {
      value: 'Click Here',
      children: [],
      image: 'https://imgur.com/qZYW3BK.png'
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  spacer: {
    hidden: false,
    type: 'spacer',
    content: {
      value: 'Click Here',
      children: []
    },
    styles: {
      height: 30,
      width: '100%',
      padding: '10px'
    }
  },
  image: {
    hidden: false,
    type: 'image',
    content: { children: [] },
    styles: {
      height: 267,
      width: 688,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  video: {
    hidden: false,
    type: 'video',
    content: {
      value: 'https://fast.wistia.com/embed/m6b92iiggl',
      children: []
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  layout: {
    hidden: false,
    type: 'layout',
    content: {
      value: 'Layout Content',
      children: [],
      sections: [
        {
          id: 'abc',
          hidden: false,
          type: 'text',
          content: {
            value: 'Text Content',
            children: []
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          }
        },
        {
          id: 'abcd',
          hidden: false,
          type: 'image',
          content: {
            value: 'https://via.placeholder.com/200',
            children: []
          },
          styles: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0
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
      paddingBottom: 0
    }
  },
  bumpOffer: {
    hidden: false,
    type: 'bumpOffer',
    content: {
      price: 10,
      title: 'Yes! I want the discount',
      introText: 'Use LeadCart Checkout to Boost Your Profit',
      bodyText: 'Get The premium upgrade with unlimited funnel, products & much more new coming features. your current package (Pro) is Limited but its upgradable.',
      value: 'bumpOffer Content',
      children: []
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
      borderRadius: 5
    }
  },
  testimonialsSection: {
    hidden: false,
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
      author: 'Michael C.',
      image: 'https://imgur.com/WzV9Jn4.png', // https://thispersondoesnotexist.com
      value: '"I am very impressed with all the features of LeadCart. It has made testimonial collection and sharing so easy for us and our students. The service and response time has also been very impressive. Highly recommend!"',
      children: []
    },
    styles: { theme: 'edgy' }
  },
  featuresSection: {
    hidden: false,
    type: 'featuresSection',
    content: {
      title: 'Features List Title',
      list: [
        { text: 'First Feature' },
        { text: 'Second Feature' },
        { text: 'Third Feature' }
      ]
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  figure: {
    hidden: false,
    type: 'figure',
    content: {
      image: 'https://i.imgur.com/7cXlr4v.png',
      text: '<p><strong class="ql-size-huge">Language</strong></p><p><br></p><p><span class="ql-size-large">Retarget visitors who speak your language. Remove visitors who don’t speak that language from your retargeting list. Never again advertise to visitors who don’t speak the right language.</span></p>'
    },
    styles: { theme: 'right-theme' }
  },
  guaranteeWidget: {
    hidden: false,
    type: 'guaranteeWidget',
    content: {
      badge: guaranteeBadge1,
      title: 'Your Satisfaction',
      description: 'Customer satisfaction our top priority and our products are results-driven & designed to ensure customers\' needs fulfilling'
    },
    styles: { theme: 'right-theme' }
  },
  code: {
    hidden: false,
    type: 'code',
    content: { value: '<h1>Hello World!</h1>' },
    styles: { height: 400 }
  },
  countDownWidget: {
    hidden: false,
    type: 'countDownWidget',
    content: {
      valueType: 'fixedTime',
      value: { date: Date.now() + 1000000 },
      children: []
    },
    styles: {
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true
    }
  },
  progressbarWidget: {
    hidden: false,
    type: 'progressbarWidget',
    content: {
      value: 93,
      children: []
    },
    styles: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  faqs: {
    hidden: false,
    type: 'faqs',
    content: {
      title: 'FAQs',
      list: [
        { title: 'FAQ Title', content: 'FAQ Content', id: ids.generate() },
        { title: 'FAQ Title', content: 'FAQ Content', id: ids.generate() },
        { title: 'FAQ Title', content: 'FAQ Content', id: ids.generate() }
      ]
    },
    styles: {
      iconsColor: '#4DA1FF',
      isCustom: 'FaPlusCircle'
    }
  }
};
