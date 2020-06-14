export const successLoginPayload = {
  success: true,
  data: {
    id: '5e70880c81f85530d0ecd553',
    email: 'fares@leadcart.io',
    firstName: 'Eslam ',
    lastName: 'Hugair',
    type: 'User',
    profileImage: 'https://s3.us-east-2.amazonaws.com/static.leadcart.io/5e70880c81f85530d0ecd553/products/start-up-icon.png',
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eUlkIjoiNWU3MDg4MGM4MWY4NTUzMGQwZWNkNTUzIiwiaWF0IjoxNTkyMDQxNDkxLCJleHAiOjE1OTQ2MzM0OTF9.SVrkaBRLHevDpAxzLIcOtrDsgDj7Lj-EU72p35RROMo',
    trial: false,
    trialEndDate: '2020-03-19T11:29:58.087Z',
    subDomain: 'local',
    company: 'Local Development Company lc',
    activeBrand: '5e734bfe183e50569712755e'
  }
};

export const failedLoginPayload = {
  success: false,
  message: 'There is no record for this email'
};
