import dotenv from 'dotenv';

let envFileName = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: __dirname + '/../' + envFileName });
