const { v4: uuidv4 }  = require( 'uuid');

const printRecord =  ({
  creator = '',
  row_count = '',
  initial_id = '',
  prefix = ''
}) => {
  const now = Date.now();

  return {
    id: uuidv4(), // Hash id
    creator, // String: name of the person
    row_count, // Number count of person name
    initial_id, // Number 
    prefix, // Prefix from the spread sheet file
    create_at: now, // unix timestamp
    update_at: now, // unix timestamp
  };
};

module.exports = {
  printRecord
}
