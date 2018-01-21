import knexJS from 'knex';
import knexConfig from './knexfile';

let knex = knexJS(knexConfig);
let bookshelf = require('bookshelf')(knex);

export default bookshelf;
