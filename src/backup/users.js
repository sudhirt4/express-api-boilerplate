import bookshelf from '../db';

const TABLE_NAME = 'users';

export class User extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  devices() {
    return this.hasMany('UserDevice');
  }

  get hasTimestamps() {
    return ['createdAt', 'updatedAt'];
  }

  outputJSON() {
    let json = this.toJSON();
    delete json['password'];

    return json;
  }

  static fetchByEmail(email) {
    return User.where('email', email).fetch();
  }
}

export default User;
