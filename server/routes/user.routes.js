const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const avatar = require('../middleware/avatar.middleware')
const { requireLoggedIn, requireAdmin } = require('../middleware/auth.middleware')

// Auth
router.post("/register", authController.signUp)
router.post("/login", authController.signIn)
router.get('/logout', requireLoggedIn, authController.logout)

// User display: 'block'
router.get('/', requireLoggedIn, userController.getAllUsers)
router.get('/:id', requireLoggedIn, userController.userInfo)
router.put('/:id', requireLoggedIn, userController.updateUser)
router.delete('/:id', requireLoggedIn, requireAdmin, userController.deleteUser)
router.patch('/follow/:id', requireLoggedIn, userController.follow)
router.patch('/unfollow/:id', requireLoggedIn, userController.unfollow)

// Upload
router.post("/upload", requireLoggedIn, avatar, userController.uploadProfil)

module.exports = router