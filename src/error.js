'use strict'

export default ({ message, type, errors } = {}) => ({
  name: 'FipePromiseError',
  message,
  type,
  errors
})
