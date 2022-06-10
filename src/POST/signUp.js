'use strict';

const { createResponse, parseEventBodyData } = require('../utils/response')
const {encryptPassword,decryptPassword,validatePassword} = require('../utils/password')

const signUp = async ( event ) => {
  const { body: bodyString = '' } = event;
  const {
    errorMessage = '',
    email,
    mobile_no,
    first_name,
    last_name,
    middle_name,
    password,
  } = parseEventBodyData({ bodyString })

  const encryptedPW = encryptPassword({password});
  const decryptedPW = decryptPassword({cipherPassword: encryptedPW})
  const passwordValidationResult = validatePassword({
    password,
    encryptedPassword: encryptedPW
  })

  /*
    ---- Process flow ----
    1. Get body string - DONE
        * email
        * mobile_no
        * first_name
        * last_name
        * middle_name
        * password
    
    2. Validate data-type, truty and formats of each inputs from #1

    3. Check if email is already existing in ACCOUNTS table

    4. Encrypt password to AES - DONE

    4. Save records to <STAGE>_ACCOUNT table,
    if email don't exist & validation is success.

    5. Return in response to inform user is registered successfully
  */

  return createResponse({
    data: {
      errorMessage,
      email,
      mobile_no,
      first_name,
      last_name,
      middle_name,
      password,
      encryptedPW,
      decryptedPW,
      passwordValidationResult
    },
    message: `Thank you!, you sign-up successfully`,
    success: errorMessage ? false : true,
    statusCode: 200,
  })
}

module.exports = signUp;
