const { v4: uuidv4 }  = require( 'uuid');

const { ajvValidateItem } = require('../utils/ajv')
const { encryptPassword } = require('../utils/password')

const accountSchema =  ({ 
  email,
  mobile_no,
  first_name,
  last_name,
  middle_name = null,
  password,
}) => {
  const now = Date.now();

  const schema = {
    type: 'object',
    properties: {
      id: {type: 'string'},
      email: {type: 'string'},
      mobile_no: {type: 'integer'},
      first_name: {type: 'string'},
      last_name:  {type: 'string'},
      middle_name:  {type:  ["string", "null"]},
      password:  {type: 'string'},
      create_at:  {type: 'integer'},
      update_at: {type: 'integer'},
    },
    required: [
      'id',
      'email',
      'mobile_no',
      'first_name',
      'last_name',
      'password',
      'create_at',
      'update_at'
    ],
    additionalProperties: false
  }

  try{
    const item = {
      id: uuidv4(),
      email,
      mobile_no: Number(mobile_no),
      first_name,
      last_name,
      middle_name: middle_name || null,
      password: encryptPassword({password}),
      create_at: now,
      update_at: now,
    };
   
   const {
    isValid,
    errorMessage,
   } =  ajvValidateItem({ item, schema })

   return {
      isValid,
      errorMessage,
      data: isValid ? item : null
    }
  }catch( err ){

    return {
      isValid: false,
      errorMessage: `Internal Error: ${err.message}`,
      data: null
    }
  }
};

module.exports = {
  accountSchema
}
