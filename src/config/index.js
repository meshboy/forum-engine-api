/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 * */
const env = process.env.NODE_ENV;

const baseConfig = {
  port: 3000,
  expireTime: '10d',
  secret: 'default-secret',
  db: {
    url: 'mongodb://localhost/forum-api',
  },
};

let envConfig = {};

switch (env) {

  case 'production':
    // envConfig = require('./prod').config;
    break;

  case 'development':
    envConfig = require('./dev').config;
    break;

  default:
    envConfig = require('./dev').config;
    break;
}

export default Object.assign(baseConfig, envConfig);
