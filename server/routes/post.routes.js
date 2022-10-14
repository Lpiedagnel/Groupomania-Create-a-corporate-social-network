const router = require("express").Router()
const postController = require("../controllers/post.controller")
const { uploadFile } = require("../middleware/image.middleware")
const {
  requireAdmin,
  requireLoggedIn,
} = require("../middleware/auth.middleware")

router.get("/", requireLoggedIn, postController.readPost)
router.post("/", requireLoggedIn, uploadFile, postController.createPost)
router.put("/:id", requireLoggedIn, requireAdmin, postController.updatePost)
router.delete("/:id", requireLoggedIn, requireAdmin, postController.deletePost)
router.patch("/like-post/:id", requireLoggedIn, postController.likePost)
router.patch("/unlike-post/:id", requireLoggedIn, postController.unlikePost)

// Comments
router.patch("/comment-post/:id", requireLoggedIn, postController.commentPost)
router.patch(
  "/edit-comment-post/:id",
  requireLoggedIn,
  requireAdmin,
  postController.editCommentPost
)
router.patch(
  "/delete-comment-post/:id",
  requireLoggedIn,
  requireAdmin,
  postController.deleteCommentPost
)

module.exports = router
