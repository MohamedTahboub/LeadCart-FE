import config from 'react-global-configuration'

const env = process.env.ENVIRONMENT
config.set({
    env: process.env.ENVIRONMENT,
    API_LINK: env === 'dev' ? 'http://localhost:5001' : '',
    DEBUG_API_LINK: env === 'dev' ? 'http://localhost:5002' : '',
    SITE_DOMAIN: env === 'dev' ? 'http://localhost:5000' : '',
    S3_DIR: ''
})