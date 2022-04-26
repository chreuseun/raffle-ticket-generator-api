/*
    IN FRONT END

    Required Inputs:
    1. Email address
    2. Password
*/

module.exports = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Go Serverless v1.0! Your function executed successfully!',
          input: event,
          function:'loginUser'
        },
        null,
        2
      ),
    };
  
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
  };
  