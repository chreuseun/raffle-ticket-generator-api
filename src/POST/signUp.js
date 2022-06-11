'use strict';

const { createResponse, parseEventBodyData } = require('../utils/response')
const { accountSchema } = require('../schemas/account')

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

  const accountItem = accountSchema({email,first_name,last_name,mobile_no,password,middle_name});
  const message = errorMessage || accountItem.errorMessage ||`Thank you!, you sign-up successfully`
  const success = errorMessage || accountItem.errorMessage ? false : true

  return createResponse({
    data: process.env.STAGE === 'DEV' ? accountItem?.data : null,
    message,
    success: success,
    statusCode: 200,
  })
}

module.exports = signUp;
