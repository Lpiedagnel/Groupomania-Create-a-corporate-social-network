const router = require("express").Router()
const postController = require("../controllers/post.controller")
const { uploadFile } = require("../middleware/image.middleware")
const { requireAdmin } = require("../middleware/auth.middleware")

router.get("/", postController.readPost)
router.post("/", uploadFile, postController.createPost)
router.put("/:id", requireAdmin, postController.updatePost)
router.delete("/:id", requireAdmin, postController.deletePost)
router.patch("/like-post/:id", postController.likePost)
router.patch("/unlike-post/:id", postController.unlikePost)

// Comments
router.patch("/comment-post/:id", postController.commentPost)
router.patch("/edit-comment-post/:id", postController.editCommentPost)
router.patch("/delete-comment-post/:id", postController.deleteCommentPost)

module.exports = router
