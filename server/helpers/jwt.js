const jwt = require('jsonwebtoken')

function sign(payload) {
<<<<<<< HEAD
  return jwt.sign(payload, process.env.KUNCI)
}

function verify(token) {
  return jwt.verify(token, process.env.KUNCI)
=======
  return jwt.sign(payload, process.env.JWT_SECRET)
}

function verify(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
>>>>>>> 6aed9fc40b2b8a4ee4dc2f350faba034d6dfe1ee
}

module.exports = {
  sign, verify
}