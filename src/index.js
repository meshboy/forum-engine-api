/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 **/
import http from 'http'
import { createServer } from 'http'

import app from './server'

const server = http.createServer(app);
let currentApp = app;

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  });
}
