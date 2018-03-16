import * as AuthServices from '../auth';

import * as UserServices from '../users';
import Model from '../../models';
import * as TokenUtils from '../../utils/token';

const sampleUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@test.com',
  password: 'johnydoey'
};

const validLoginRequestBody = {
  email: sampleUser.email,
  password: sampleUser.password
};

const INVALID_TOKEN_MESSAGE = 'Invalid token';

let user = null;
function setupUser() {
  return Promise.all([
    Model.User.destroy({ truncate: true, cascade: true }),
    Model.AuthDevice.destroy({ truncate: true, cascade: true }),
    UserServices.create(sampleUser).then(_user => {
      user = _user;
    })
  ]);
}

describe('login', () => {
  beforeAll(function() {
    return setupUser();
  });

  describe('when valid credentials', () => {
    let loginResponse = null;
    let deviceId = null;

    describe('without device params', () => {
      beforeAll(async () => {
        loginResponse = await AuthServices.login(validLoginRequestBody);
        let { id } = TokenUtils.verifyRefreshToken(
          loginResponse.token.refresh
        ).data;
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

describe('refresh', () => {
  beforeAll(function() {
    return setupUser();
  });

  describe('valid refresh token provided', () => {
    let validRefreshToken = null;

    describe('valid device exists', () => {
      beforeAll(async () => {
        let loginResponse = await AuthServices.login(validLoginRequestBody);
        validRefreshToken = loginResponse.token.refresh;
      });

      test('should return fresh access token', async () => {
        let response = await AuthServices.refresh(validRefreshToken);
        expect(response.token.access).toBeDefined();
      });
    });

    describe('device has been removed', () => {
      beforeAll(async () => {
        let loginResponse = await AuthServices.login(validLoginRequestBody);
        validRefreshToken = loginResponse.token.refresh;
        Model.AuthDevice.destroy({ truncate: true, cascade: true });
      });

      test('should throw exception', async () => {
        expect.assertions(1);
        try {
          await AuthServices.refresh(validRefreshToken);
        } catch (err) {
          expect(err.message).toEqual(INVALID_TOKEN_MESSAGE);
        }
      });
    });
  });

  describe('invalid refresh token provided', () => {
    let inValidRefreshToken = null;

    test('should throw exception', async () => {
      expect.assertions(1);
      try {
        await AuthServices.refresh(inValidRefreshToken);
      } catch (err) {
        expect(err.message).toEqual(INVALID_TOKEN_MESSAGE);
      }
    });
  });
});

describe('logout', () => {
  beforeAll(function() {
    return setupUser();
  });

  describe('when valid deviceId provided', () => {
    let deviceId = null;
    beforeAll(async () => {
      await AuthServices.login(validLoginRequestBody);
      let authDevice = await Model.AuthDevice.findOne({
        where: { userId: user.id }
      });
      deviceId = authDevice.id;
    });

    it('should remove the device', async () => {
      await AuthServices.logout(deviceId);
      let device = await Model.AuthDevice.findOne({
        where: { userId: user.id }
      });
      expect(device).toBeNull();
    });
  });
});
