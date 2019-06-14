const router = require('express').Router()
const recipe = require('../controllers/recipe')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.get('/search', recipe.search)
router.get('/:uri', recipe.detail)

router.use(authenticate)

router.post('/addfav', recipe.addToFav)
router.delete('/deletefav/:id', authorize, recipe.removeFav)

module.exports = router