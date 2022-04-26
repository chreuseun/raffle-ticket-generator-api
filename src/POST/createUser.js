'use strict';

const AWS = require('aws-sdk');

const { account }  = require('../schemas/account')

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const saveUser = async user => {
  try{
    console.log(`Saving user: `);
    const userInfo = {
      TableName: process.env.TABLE_ACCOUNTS,
      Item: user,
    };

    await dynamoDb.put(userInfo)

    return true
  }catch(err){
    console.log('create-user: ', e)
    return false;
  }
};

const createUser = async ( event, _, callback ) => {
  try{
    const requestBody = JSON.parse(event.body);
    const email = requestBody.email;
    const password = requestBody.password;

    if(email && password && typeof email !== 'string' && typeof password !== 'string' ){
      console.error('Validation Failed');
      callback(null,{
        statusCode: 500,
        body: JSON.stringify({
          message: `Create user: some inputs are not valid`,
          success:false
        })
      });

      return;
    }

    const dbResponse = await saveUser(account({email, password}))

    callback(null, {
      statusCode: dbResponse ? 200 : 500,
      body: JSON.stringify({
        message: dbResponse ? `Email: ${email} is successfully saved` : 'Error: User is not saved.',
        success: dbResponse
      })
    })
  }catch(err){
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: `ERROR: Unable to submit candidate with email, ERROR: ${err} `,
        success: false
      })
    })
  }

};


module.exports = createUser
