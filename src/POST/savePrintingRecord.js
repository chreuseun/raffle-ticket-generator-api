'use strict';

const AWS = require('aws-sdk');

const { printRecord }  = require('../schemas/printRecord')
const { DEFAULT_HTTP_HEADERS } = require('../constants/https')
const callBackResponse = require('../utils/response')

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const headers = { ...DEFAULT_HTTP_HEADERS }
const { createResponseCallback  } = callBackResponse

const savePrintRecord =  async (printRecord, callback) => {

  try{
    console.log(`Saving Print Record in ${process.env.TABLE_PRINT_RECORDS}`);

    const printRecordInfo = {
      TableName: process.env.TABLE_PRINT_RECORDS,
      Item: printRecord
    }

    const response = await dynamoDb.put(printRecordInfo).promise();

    createResponseCallback({
      callback,
      statusCode: 200,
      headers,
      message: `Printing Record: Successfully saved.`,
      success: true,
      data: JSON.stringify(response)
    })
  }catch(err){
    createResponseCallback({
      callback,
      headers,
      statusCode: 500,
      message:  `Save Print Record: Database operation related issue, unable to save print record. Error details: ${err}`,
      data: null,
      success:false,
    })
  }
}


const savePrintingRecords = async ( event, _, callback ) => {
  try{
    const requestBody = JSON.parse(event.body);
    const {
      creator = '',
      row_count = '',
      initial_id = '',
      prefix = ''
    } = requestBody
    const isValidated = [creator,row_count,initial_id,prefix].every(i => !!i);

    if(isValidated){
      await savePrintRecord(
        printRecord({
          creator,
          row_count,
          initial_id,
          prefix
        }),
        callback
      )

      return
    }


    createResponseCallback({
      callback,
      statusCode: 500,
      headers,
      data:null,
      message: `Save Printing Record: Input validation error`,
      success:false
    })
  }catch(err){
    createResponseCallback({
      callback,
      data: null,
      headers,
      message: `Unable to save printing record. Error: ${err}`,
      statusCode: 500,
      success:false
    })
  }
};

module.exports = savePrintingRecords
