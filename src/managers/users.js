export default class UserManager {
  constructor(User) {
    this.User = User;

    this.CONSTRAINTS = {
      UNIQUE_EMAIL: {
        key: 'users_email_key',
        message: 'Email has already been taken.'
      },
      INVALID_CRED: {
        key: 'not_found',
        message: 'Invalid email or password'
      }
    };
  }

  fetchByEmail(email, options) {
    options = {
      include: [
        {
          association: 'roles'
        }
      ],
      ...options
    };

    return this.User.find({
      where: { email },
      ...options
    });
  }
}
