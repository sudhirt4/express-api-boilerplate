import bookshelf from '../db';

let User = bookshelf.Model.extend({
  tableName: 'users'
});

export default User;
