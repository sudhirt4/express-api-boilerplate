import bcrypt from 'bcrypt';
import { SALT_WORK_FACTOR } from '../constants/auth';

export async function encrypt(data) {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  return await bcrypt.hash(data, salt);
}

export async function compare(data, source) {
  return await bcrypt.compare(data, source);
}
