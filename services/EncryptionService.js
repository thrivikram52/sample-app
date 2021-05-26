import bcrypt from 'bcryptjs';

export const generateBcryptPassword = (password) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const compareBcryptPassword = (password,bcryptedPassword) => {
    let isValid = bcrypt.compareSync(password, bcryptedPassword);
    return isValid;
}