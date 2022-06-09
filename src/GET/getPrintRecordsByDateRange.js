'use strict';

const { DEFAULT_HTTP_HEADERS } = require('../constants/https')
 
const getPrintRecordsByDateRange = async  ( event, _, callback ) => {
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
}

module.exports = getPrintRecordsByDateRange;