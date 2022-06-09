const AWS = require('aws-sdk');

const newDynamoDB = new AWS.DynamoDB();

const dynamoDBDocClient = new AWS.DynamoDB.DocumentClient();

const unmarshallDynamoDBObject = (dynamoDBObj) => AWS.DynamoDB.Converter.unmarshall(dynamoDBObj)

const unmarshallDynamoDBRecords = (dynamoDBRecords) => {
  try{
    dynamoDBRecords.map(i => unmarshallDynamoDBObject(i));
  }catch{
    return []
  }
}

module.exports = {
  newDynamoDB,
  dynamoDBDocClient,
  unmarshallDynamoDBObject,
  unmarshallDynamoDBRecords
}
