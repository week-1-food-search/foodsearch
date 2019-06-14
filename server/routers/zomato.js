const router = require('express').Router()
const zomatoController = require('../controllers/zomato')

router.get('/detail/:id', zomatoController.getRestaurantDetail)
router.get('/favorite', zomatoController.getFavorite)
router.get('/:food', zomatoController.getRestaurants)
router.post('/favorite', zomatoController.create )
router.delete('/favorite/:id', zomatoController.remove)

module.exports = router