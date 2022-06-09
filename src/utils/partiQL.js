const {
  TABLE_PRINT_RECORDS
}  = require('../constants/dynamoDBTables')

const partiQLGetPrintRecordsByDateRange = ({
  dateStart = 0,
  dateEnd = 0
}) => {
  return {
    Statement: `SELECT * FROM ${TABLE_PRINT_RECORDS} WHERE create_at ? BETWEEN ?`,
    Parameters: [
      { N: dateStart }, 
      { N: dateEnd },
    ],
  }
}

module.exports = {
  partiQLGetPrintRecordsByDateRange
}
