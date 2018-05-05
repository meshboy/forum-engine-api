/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 * */
import ExpressJwt from 'express-jwt';
import Jwt from 'jsonwebtoken';
import Joi from 'joi';
import { User } from '../resources/user/user.model';

const expiresIn = '10d';
const secret = 'test.secret';
const checkToken = ExpressJwt({ secret });

/**
 * @param id
 * @returns a token with user id being wrapped
 */
export const signIn = id => Jwt.sign({ id }, secret, { expiresIn });

/**
 *
 * @param req
 * @param res
 * @param next
 * checktoken sniffs through the req, decode the token
 */
const validateToken = (req, res, next) => {
  checkToken(req, res, next);
};

export const loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // validate the data coming from the client before processing
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
  });

  const result = Joi.validate({ email, password }, schema);

  if (result.error) {
    res.status(400).json({ status: false, message: result.error });
  } else {
    User.findOne({ email }).exec()
      .then(user => {
        if (user) {
          if (user.comparePassword(password)) {
            req.user = user;
            res.status(200)
              .json({ status: true, data: { token: signIn(req.user._id) } });
          } else {
            res.status(401)
              .json({ status: false, message: 'Password is incorrect' });
          }
        } else {
          res.status(404)
            .json({ status: false, message: 'User does not exist! Kindly register' });
        }
      })
      .catch(error => next(error));
  }
};

/**
 *
 * once the Bearer tokenValue is matched, the validateToken grabs the token from req(request)
 */
export const decodeToken = () => (req, res, next) => {
  if (req.headers.access_token) {
    req.headers.authorization = `Bearer ${req.headers.access_token}`;
  }
  validateToken(req, res, next);
};

export const getUser = () => (req, res, next) => {

  User.findById({_id: req.user.id})
    .then(user => {
      if (user) {
        console.log(user)
        req.user = user;
        // get user id and use where necessary
        req.body.user = user.id;
        next();
      } else {
        res.json({ status: false, message: 'User not found' });
      }
    })
    .catch(error => next(error));
}

export const createUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // validate the data coming from the client before processing
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
  });

  const result = Joi.validate({ email, password }, schema);

  if (result.error) {
    res.status(400).json({ status: false, message: result.error });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.status(400).json({ status: false, message: 'email already exist' });
        } else {
          const newUser = new User();
          newUser.email = email;
          newUser.passwordHash = newUser.generateHashPassword(password);

          newUser.save().then(doc => {
            req.user = doc;
            res.status(200)
              .json({ status: true, data: { token: signIn(req.user._id) } });
          }).catch(error => next(error));
        }
      })
      .catch(error => next(error));
  }
};

export const secure = [decodeToken(), getUser()];
