/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 **/
import bodyparser from 'body-parser';

const middleware = (app) => {
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());
};

export default middleware;
