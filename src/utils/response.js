const { DEFAULT_HTTP_HEADERS } = require('../constants/https')
const { errorObject } = require('./error')

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

const createResponse = ({
  statusCode = 500,
  headers = {},
  message = '',
  data = null,
  success = false
}) => {
  try{

    return{
      statusCode,
      headers: {...DEFAULT_HTTP_HEADERS, ...headers},
      body: JSON.stringify({
        message, // message to display in front-end / client
        success, // 200, 401, 401 504 .... 
        data,
      })
    }
  }catch{

    return {
      statusCode: 500,
      headers: {...DEFAULT_HTTP_HEADERS, ...headers},
      body: JSON.stringify({
        message: err.message || 'Error is occured', 
        success: false,
        data,
      })
    }
  }
 
}

const getRequestQueryStringParameters = ({event = {}}) => {
  try{
    const { queryStringParameters  = {} } = event

    return queryStringParameters
  }catch{

    return {}
  }
}

const parseEventBodyData  = ({ bodyString }) => {
  try{
    return JSON.parse(bodyString)
  }catch (error){
    return errorObject({errorMessage: error.message})
  }
}

module.exports = {
  createResponseCallback,
  createResponse,
  getRequestQueryStringParameters,
  parseEventBodyData,
}
