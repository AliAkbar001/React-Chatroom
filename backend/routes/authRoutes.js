const { Router } = require('express')
const { signup, login, logout, verifyUser } = require('../controllers/authControllers')
const router = Router()
router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/verifyUser', verifyUser)

module.exports = router;
