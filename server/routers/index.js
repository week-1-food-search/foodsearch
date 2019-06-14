const router = require('express').Router()
const recipeRoutes = require('./recipe')
const userRoutes = require('./user')
<<<<<<< HEAD
const zomatoRoutes = require('./zomato')
const authentication = require('../middlewares/authenticate')
=======
>>>>>>> 6aed9fc40b2b8a4ee4dc2f350faba034d6dfe1ee

router.get('/', (req,res)=>{
    res.send('testing')
})
<<<<<<< HEAD
// router.use('/recipe',recipeRoutes)
router.use('/user',userRoutes)
router.use(authentication)
router.use('/restaurants', zomatoRoutes)
=======
router.use('/recipe',recipeRoutes)
router.use('/user',userRoutes)
>>>>>>> 6aed9fc40b2b8a4ee4dc2f350faba034d6dfe1ee

module.exports = router