const Album = require('../models/album')

module.exports = (req, res, next) => {
  Album.findById(req.params.id)
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
        next({ code: 404, message: 'Album not found' })
    })
    .catch(next)
}