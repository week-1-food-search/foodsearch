const Recipe = require('../models/recipe')

module.exports = (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(row => {
      if (row) {
        if (row.user.equals(req.decoded._id)) {
          next()
        }
        else {
          next({ code: 401, message: 'Unauthorized' })
        }
      }
      else
        next({ code: 404, message: 'Recipe not found' })
    })
    .catch(next)
}