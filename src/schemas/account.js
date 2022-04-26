const { v4: uuidv4 }  = require( 'uuid');


const account =  ({ email, password}) => {
  const now = Date.now();

  return {
    id: uuidv4(),
    email,
    password,
    create_at: now,
    update_at: now,
  };
};

module.exports = {
  account
}
