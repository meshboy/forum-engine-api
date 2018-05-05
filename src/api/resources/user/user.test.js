/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 * */
import { expect } from 'chai';
import { schema } from './user.model';

describe('User Model', () => {
  it('should contain an email', () => {
    expect(schema.email).to.exist;
    expect(schema.email.type).to.eql(String);
    expect(schema.email.unique).to.eql(true);
    expect(schema.email.required).to.be.an('array');
  });

  it('should contain a passwordHash', () => {
    expect(schema.passwordHash).to.exist;
    expect(schema.passwordHash.type).eql(String);
    expect(schema.passwordHash.required).to.be.an('array');
  });
});
