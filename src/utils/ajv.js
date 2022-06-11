const Ajv = require('ajv')

const mapValidationErrors = ( errorArray ) => { 
  return errorArray.map(i => {
       const {
           message = '',
           instancePath = ''
       } = i

       return  `${instancePath ? `${instancePath.replace('/','')} ` : ''}${message}`
   }).join()
}

const ajvValidateItem = ({
  item = {},
  schema = {}
}) => {
  let errorMessage = null
  let isValid = false
  const ajv = new Ajv({
    allErrors: true
  })

  try{ 
    const validate = ajv.compile(schema)
    isValid = validate(item)
    const { errors = null } = validate

    if(errors){
      errorMessage = mapValidationErrors( errors )
    }
  }catch(err){
    errorMessage = err.message
  }

  return {
    errorMessage,
    isValid
  } 
}

module.exports = {
  mapValidationErrors,
  ajvValidateItem
} 