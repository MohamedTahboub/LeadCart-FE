export default [
  {
    trigger: 'Purchase Complete',
    triggerGroups: [
      {
        products: [
          '5e0e30c1441a9a28244bd83a'
        ],
        action: {
          serviceName: 'Aweber',
          serviceAction: 'Add to Welcome List'
        }
      },
      {
        products: ['5e0e30c1441a9a28244bd83a', '5e085c981c2711255205cff4'],
        action: {
          serviceName: 'Aweber',
          serviceAction: 'Add to Welcome List'
        }
      },
      {
        products: ['5e0853781c2711255205cff2', '5e0e30c1441a9a28244bd83a'],
        action: {
          serviceName: 'Aweber',
          serviceAction: 'Add to Welcome List'
        }
      }
    ]
  }, {
    trigger: 'Subscription Canceled',
    triggerGroups: [
      {
        products: [
          '5e085c981c2711255205cff4'
        ],
        action: {
          serviceName: 'Aweber',
          serviceAction: 'Add to Welcome List'
        }
      },
      {
        products: ['5e0853781c2711255205cff2'],
        action: {
          serviceName: 'ActiveCampaign',
          serviceAction: 'Webinar customers list'
        }
      }
    ]
  }, {
    trigger: 'Purchase Complete',
    triggerGroups: [
      {
        products: [
          '5e0e30c1441a9a28244bd83a'
        ],
        action: {
          serviceName: 'Aweber',
          serviceAction: 'Add to Welcome List'
        }
      },
      {
        products: ['5e0e30c1441a9a28244bd83a', '5e085c981c2711255205cff4'],
        action: {
          serviceName: 'Aweber',
          serviceAction: 'Add to Welcome List'
        }
      },
      {
        products: ['5e0853781c2711255205cff2', '5e0e30c1441a9a28244bd83a'],
        action: {
          serviceName: 'Aweber',
          serviceAction: 'Add to Welcome List'
        }
      }
    ]
  }, {
    trigger: 'Subscription Canceled',
    triggerGroups: [
      {
        products: [
          '5e085c981c2711255205cff4'
        ],
        action: {
          serviceName: 'Aweber',
          serviceAction: 'Add to Welcome List'
        }
      },
      {
        products: ['5e0853781c2711255205cff2'],
        action: {
          serviceName: 'ActiveCampaign',
          serviceAction: 'Webinar customers list'
        }
      }
    ]
  }
];

