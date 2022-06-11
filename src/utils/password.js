const  CryptoJS = require("crypto-js");


const encryptPassword = ({password}) => {
  try{
    return password ? 
      CryptoJS.AES.encrypt(password, '').toString() :
      null;
  }catch{
    return null;
  }
}

const decryptPassword = ({cipherPassword}) => { 
  try{
    const bytes  = CryptoJS.AES.decrypt(cipherPassword, '');

    return bytes.toString(CryptoJS.enc.Utf8);
  }catch{
    return null
  }

}

const validatePassword = ({password = '', encryptedPassword = ''}) => {
  try{
    return password && password === decryptPassword({cipherPassword: encryptedPassword})
  }catch{
    return false
  }
}

module.exports = {
  encryptPassword,
  decryptPassword,
  validatePassword,
}


