<<<<<<< HEAD
// const router = require('express').Router()
// const recipe = require('../controllers/recipe')

// router.get('/search', recipe.search)
// router.get('/recipe/:uri', recipe.detail)
// router.post('/addrecipe', recipe.addToFavRecipe)
// router.post('/deleterecipe', recipe.removeFavRecipe)

// module.exports = router
=======
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
>>>>>>> 6aed9fc40b2b8a4ee4dc2f350faba034d6dfe1ee
