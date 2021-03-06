const { DEFAULT_HTTP_HEADERS } = require('../constants/https')

const createResponseCallback = ({ 
  callback,
  statusCode = 200,
  headers = DEFAULT_HTTP_HEADERS,
  message = '',
  data = null,
  success = true
 }) => {
  try{
    callback(null,{
      statusCode: statusCode,
      headers,
      body: JSON.stringify({
        message, // message to display in front-end / client
        success, // 200, 401, 401 504 .... 
        data,
      })
    });
  }catch(err) {
    callback(null,{
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: err.message || 'Error is occured', 
        success: false,
        data,
      })
    });  
  }
};

module.exports = {
  createResponseCallback
}
