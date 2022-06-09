'use strict';

const { newDynamoDB, unmarshallDynamoDBRecords } = require('../utils/dynamoDB')
const { 
  createResponse,
  getRequestQueryStringParameters
} = require('../utils/response')
const { partiQLGetPrintRecordsByDateRange } = require('../utils/partiQL')

 
const getPrintRecordsByDateRange = async  ( event ) => {
  let partiQLResponse = null;
  let err = null

  try{
    const {
      date_start: dateStart = 0,
      date_end: dateEnd = 0
    } = getRequestQueryStringParameters({event})
    const partiQLParams =  partiQLGetPrintRecordsByDateRange({
      dateStart,
      dateEnd
    })

    const {Items = []} =   await newDynamoDB.executeStatement(partiQLParams).promise() || {}
    partiQLResponse  = unmarshallDynamoDBRecords(Items)
  }catch (error){
    err = error.message
  }

  return createResponse({
    statusCode: 200,
    data: {
      items: partiQLResponse,
      length: partiQLResponse.length
    },
    message: err ||'From Get Print Records By Date Range',
    success: err ? false : true
  })
}

module.exports = getPrintRecordsByDateRange;