const router = require('express').Router()
const zomatoController = require('../controllers/zomato')

router.get('/restaurants/:food', zomatoController.getRestaurants)
router.get('/restaurants/detail/:id', zomatoController.getRestaurantDetail)


module.exports = router