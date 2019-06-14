const router = require('express').Router()
const food2forkRoutes = require('./food2fork')

router.get('/', (req,res)=>{
    res.send('testing')
})
router.use('/food2fork',food2forkRoutes)

module.exports = router