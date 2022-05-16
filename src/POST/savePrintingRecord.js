'use strict';

const AWS = require('aws-sdk');

const { printRecord }  = require('../schemas/printRecord')
const { DEFAULT_HTTP_HEADERS } = require('../constants/https')

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const headers = { ...DEFAULT_HTTP_HEADERS }

const savePrintRecord =  async (printRecord, callback) => {

  try{
    console.log(`Saving Print Record in ${process.env.TABLE_PRINT_RECORDS}`);

    const printRecordInfo = {
      TableName: process.env.TABLE_PRINT_RECORDS,
      Item: printRecord
    }

    await dynamoDb.put(printRecordInfo).promise();

    callback(null,{
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: `Printing Record: Successfully saved.`,
        success:true
      })
    });

  }catch(err){
    callback(null, {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: `Save Print Record: Database operation related issue, unable to save print record. Error details: ${err} `,
        success: false
      })
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

    callback(null,{
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: `Save Printing Record: Input validation error`,
        success:false
      })
    });

  }catch(err){
    callback(null, {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: `Unable to save printing record. Error: ${err} `,
        success: false
      })
    })
  }
};

module.exports = savePrintingRecords
