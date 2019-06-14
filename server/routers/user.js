const router = require('express').Router()
const user = require('../controllers/user')

router.post('/register', user.register)
router.post('/login', user.login)
router.post('/signingoogle', user.GoogleSignIn)

<<<<<<< HEAD



=======
>>>>>>> 6aed9fc40b2b8a4ee4dc2f350faba034d6dfe1ee
module.exports = router