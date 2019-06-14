const router = require('express').Router()
const zomatoController = require('../controllers/zomato')
const authentication = require('../middlewares/authenticate')

router.get('/detail/:id', zomatoController.getRestaurantDetail)
router.get('/favorite',authentication, zomatoController.getFavorite)
router.get('/:food', zomatoController.getRestaurants)
router.post('/favorite', authentication, zomatoController.create )
router.delete('/favorite/:id', authentication,  zomatoController.remove)

module.exports = router