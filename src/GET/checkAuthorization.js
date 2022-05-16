'use strict';

const { DEFAULT_HTTP_HEADERS } = require('../constants/https')

module.exports = async (event) => {
  const headers = { ...DEFAULT_HTTP_HEADERS };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
        function:'checkAuthorization'
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
