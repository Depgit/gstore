import { genSaltSync, hashSync, compareSync } from 'bcrypt';

// function to encrypt password
function encrypt(password) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

// function to decrypt password
function decrypt(password, hashedPassword) {
  return compareSync(password, hashedPassword);
}

export default {
    encrypt,
    decrypt
}