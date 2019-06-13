const router = require('express').Router()
const album = require('../controllers/album')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.use(authenticate)

router.get('/', album.findAll)
router.post('/', album.create)

router.get('/:id', authorize, album.findOne)
router.put('/:id', authorize, album.update)
router.patch('/:id', authorize, album.update)
router.delete('/:id', authorize, album.delete)

module.exports = router