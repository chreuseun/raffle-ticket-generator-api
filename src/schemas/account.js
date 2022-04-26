const { v4: uuidv4 }  = require( 'uuid');


const account =  ({ email, password}) => {
  return {
    id: uuidv4(),
    email,
    password
  };
};

module.exports = {
  account
}
