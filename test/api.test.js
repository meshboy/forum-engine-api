/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 * */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { dropDb } from './helpers';
import app from '../src/server';
import { signIn } from '../src/api/modules/auth';
import { User } from '../src/api/resources/user/user.model';


chai.use(chaiHttp);

const createApiSec = (model, resourceName, newResource) => {
  describe(`/${resourceName}`, () => {
    let jwt;

    beforeEach(async () => {
      await dropDb();

      const user = User.create({ email: 'test@gmail.com', passwordHash: '12345fhg' });
      jwt = signIn(user._id);
    });

    afterEach(async () => {
      await dropDb();
    });

    describe(`GET /${resourceName}`, () => {
      it(`should get all ${resourceName}`, async () => {
        const result = await chai.request(app)
          .get(`/api/v1/${resourceName}`)
          .set('Authorization', `Bearer ${jwt}`);

        expect(result).to.have.status(200);
        expect(result).to.be.json;
      });
    });

    describe(`POST /${resourceName}`, () => {
      it(`should create a ${resourceName}`, async () => {
        const result = await chai.request(app)
          .post(`/api/${resourceName}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(newResource);

        expect(result).to.have.status(200);
        expect(result).to.be.json;
      });
    });

    describe(`GET only one /${resourceName}`, () => {
      it(`should get a single ${resourceName}`, async () => {
        const result = await chai.request(app)
          .get(`/api/${resourceName}`)
          .set('Authorization', `Bearer ${jwt}`);

        expect(result).to.have.status(200);
        expect(result).to.be.json;
      });
    });
  });
};

export default createApiSec;
