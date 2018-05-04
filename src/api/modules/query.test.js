/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 * */
import { expect } from 'chai';
import { dropDb } from '~/testhelpers';
import { controllers } from './query';
import { Post } from '../resources/post/post.model';
import { User } from '../resources/user/user.model';

describe('Modules', () => {
  let user;

  beforeEach(async () => {
    await dropDb();

    user = await User.create({ email: 'test@gmail.com', passwordHash: '124whd' });
  });

  afterEach(async () => {
    await dropDb();
  });

  describe('query', () => {
    describe('createOne', () => {
      it('should create one document', async () => {
        const body = {
          title: 'test post',
          user: user._id,
        };

        const result = await controllers.createOne(Post, body);
        expect(result).to.be.ok;
        expect(result._id).to.be.ok;
        expect(result.title).to.equal('test post');
      });
    });

    describe('deleteOne', () => {
      it('should delete one document', async () => {
        const post = await controllers.createOne(Post, { title: 'test second post', user: user._id });

        const deletePost = await controllers.deleteOne(post);
        expect(deletePost._id).to.equal(post._id);
        expect(await Post.findById(post._id)).to.equal(null);
      });
    });

    describe('getOne', () => {
      it('should get one document', async () => {
        const post = await controllers.createOne(Post, { title: 'test third post', user: user._id });

        const findPost = await controllers.getOne(post);

        expect(findPost).to.equal(post);
      });
    });

    describe('getAll', () => {
      it('should get all document', async () => {
        const postArray = [
          {
            title: 'test fourth post',
            user: user._id,
          },
          {
            title: 'test fifth post',
            user: user._id,
          },
          {
            title: 'test sixth post',
            user: user._id,
          },
        ];

        const result = await Promise.all(
          postArray.map(async postObject => await controllers.createOne(Post, postObject)),
        );

        expect(result).to.be.ok;
        expect(result).to.have.length(postArray.length);
      });
    });

    describe('findByParam', () => {
      it('should find model by id', async () => {
        const newPost = await controllers.createOne(Post, { title: 'test seventh post', user: user._id });
        const findParam = await controllers.findByParam(Post, newPost._id);

        expect(newPost).to.be.ok;
        expect(findParam).to.be.ok;
        expect(newPost._id.toString()).to.be.equal(findParam._id.toString());
      });
    });
  });
});
