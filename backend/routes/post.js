const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const postCtrl = require('../controllers/post')

router.post('/', auth, multer, postCtrl.createPost)
router.get('/', auth, postCtrl.getAllPost)
router.get('/:id', auth, postCtrl.getOnePost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)
// router.post('/:id/like', auth, postCtrl.likePost)

module.exports = router