import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
}

export function decodePassword(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}

export function dateDiff(upComing: Date) {
  const today: any = new Date();
  const deliveryDate: any = new Date(upComing);
  const diffTime = Math.abs(deliveryDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { diffTime, diffDays };
}
