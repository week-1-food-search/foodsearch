const router = require('express').Router()
const food2forkRoutes = require('./food2fork')
const zomatoRoutes = require('./zomato')
router.get('/', (req,res)=>{
    res.send('testing')
})
// router.use('/food2fork',food2forkRoutes)
router.use('/zomato', zomatoRoutes)


module.exports = router