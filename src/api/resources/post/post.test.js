/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 **/
import { expect } from 'chai';
import { schema } from './post.model';

console.log(schema)

describe('Post Model', () => {

  it('should contain a title', () => {
    expect(schema.title).to.exist;
    expect(schema.title.type).to.eql(String);
    expect(schema.title.required).to.be.an('array')
  });

  it('should have user', () => {
    expect(schema.user).to.exist;
    expect(schema.user.required).to.be.an('array')
  });

  it('should have comment', () => {
    expect(schema.comment).to.exist;
    expect(schema.comment[0].user).to.exist;
    expect(schema.comment[0].message).to.exist;
    expect(schema.comment).to.be.an('array');
  });
});
