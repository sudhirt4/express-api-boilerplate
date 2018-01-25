import bookshelf from '../db';

const TABLE_NAME = 'user_devices';

export const USER_DEVICE_CONSTRAINTS = {};

export class UserDevice extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return ['createdAt', 'updatedAt'];
  }
}

export default User;
