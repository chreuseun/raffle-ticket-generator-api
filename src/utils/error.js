const errorObject = ({ errorMessage = '' }) => {
  return ({
    error: true,
    errorMessage: errorMessage
  })
}

module.exports = {
  errorObject 
}
