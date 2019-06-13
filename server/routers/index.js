const router = require('express').Router()
const recipeRoutes = require('./recipe')
const userRoutes = require('./user')

router.get('/', (req,res)=>{
    res.send('testing')
})
router.use('/recipe',recipeRoutes)
router.use('/user',userRoutes)

module.exports = router