const router = require('express').Router()
const recipeRoutes = require('./recipe')
const userRoutes = require('./user')
const zomatoRoutes = require('./zomato')
const authentication = require('../middlewares/authenticate')

router.get('/', (req,res)=>{
    res.send('testing')
})
// router.use('/recipe',recipeRoutes)
router.use('/user',userRoutes)
router.use(authentication)
router.use('/restaurants', zomatoRoutes)
router.use('/recipe',recipeRoutes)

module.exports = router