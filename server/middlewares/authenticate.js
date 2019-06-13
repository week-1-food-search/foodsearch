const User = require('../models/user')
const jwt = require('../helpers/jwt')

module.exports = (req,res,next)=>{
  // console.log(req.headers['access-token'])
  if(req.headers['token']) {
    try {
      req.decoded = jwt.verify(req.headers['token'])
    }
    catch(err) {
      next({ code: 400, message: 'Invalid Token' })
    }
    User.findById(req.decoded._id)
      .then(row =>{
        if(row)
          next()
        else
          next({ code: 404, message: 'User not found' })
      })
      .catch(next)
  }
  else
    next({ code: 401, message: 'please login first' })
}