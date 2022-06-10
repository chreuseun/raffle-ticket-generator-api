const { v4: uuidv4 }  = require( 'uuid');

const account =  ({ 
  email,
  mobile_no,
  first_name,
  last_name,
  middle_name,
  password,
}) => {
  const now = Date.now();

  return {
    id: uuidv4(),
    email,
    mobile_no,
    first_name,
    last_name,
    middle_name,
    password,
    create_at: now,
    update_at: now,
  };
};

module.exports = {
  account
}
