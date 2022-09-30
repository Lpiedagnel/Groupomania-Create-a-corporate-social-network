const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const avatar = require('../middleware/avatar.middleware')

// Auth
router.post("/register", authController.signUp)
router.post("/login", authController.signIn)
router.get('/logout', authController.logout)

// User display: 'block'
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)

// Upload
router.post("/upload", avatar, userController.uploadProfil)

module.exports = router