import * as AuthServices from '../services';

import Model from '../../../models';
import * as UserServices from '../../users/services';
import * as TokenUtils from '../../../utils/token';

const sampleUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@test.com',
  password: 'johnydoey'
};

describe('login', () => {
  let user = null;
  beforeAll(function() {
    return Promise.all([
      Model.User.destroy({ truncate: true, cascade: true }),
      Model.AuthDevice.destroy({ truncate: true, cascade: true }),
      UserServices.create(sampleUser).then(_user => {
        user = _user;
      })
    ]);
  });

  describe('when valid credentials', () => {
    let loginResponse = null;
    let deviceId = null;

    describe('without device params', () => {
      beforeAll(async () => {
        loginResponse = await AuthServices.login({
          email: sampleUser.email,
          password: sampleUser.password
        });
        let { id } = TokenUtils.verifyRefreshToken(loginResponse.token.refresh).data;
        deviceId = id;
      });

      test('should return access and refresh tokens', async () => {
        expect(loginResponse.token.access).toBeTruthy();
        expect(loginResponse.token.refresh).toBeTruthy();
      });

      test('should add refresh token for user', async () => {
        let count = await Model.AuthDevice.count({
          where: {
            userId: user.id,
            id: deviceId
          }
        });
        expect(count).toEqual(1);
      });
    });
  });

  describe('when invalid credentials', () => {
    let loginResponse = null;

    describe('invalid user', () => {
      test('should throw error', () => {
        expect.assertions(1);

        return AuthServices.login({
          email: 'invaliduser@gmail.com',
          password: sampleUser.password
        }).catch(err => {
          expect(err.message).toEqual('Invalid email or password');
        });
      });
    });

    describe('invalid user', () => {
      test('should throw error', () => {
        expect.assertions(1);

        return AuthServices.login({
          email: sampleUser.email,
          password: 'invalidpassword'
        }).catch(err => {
          expect(err.message).toEqual('Invalid email or password');
        });
      });
    });
  });
});
