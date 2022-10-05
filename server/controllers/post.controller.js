const PostModel = require("../models/post.model")
const UserModel = require("../models/user.model")
const ObjectId = require("mongoose").Types.ObjectId

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs)
    else console.log("Error to get data: " + err)
  }).sort({ createdAt: -1 })
}

module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture:
      req.file !== undefined ? `./uploads/posts/${req.file.filename}` : "",
    video: req.body.video,
    likers: [],
    comments: [],
  })

  try {
    const post = await newPost.save()
    return res.status(201).json(post)
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports.updatePost = (req, res) => {
  // If ID not found
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id)

  const updatedRecord = {
    message: req.body.message,
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true }
  )
    .then((docs) => res.status(201).json(docs))
    .catch((err) => res.status(500).send({ message: err }))
}

module.exports.deletePost = (req, res) => {
  // If ID not found
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id)

  PostModel.findByIdAndRemove(req.params.id)
    .then((docs) => res.status(200).json(docs))
    .catch((err) => res.status(500).send({ message: err }))
}

module.exports.likePost = async (req, res) => {
  // If ID not found
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id)

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true }
    ).catch((err) => res.status(400).send({ err }))

    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(400).send({ message: err }))
  } catch (err) {
    return res.status(400).send({ message: err })
  }
}

module.exports.unlikePost = async (req, res) => {
  // If ID not found
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id)

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true }
    ).catch((err) => res.status(400).send({ err }))

    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(400).send({ message: err }))
  } catch (err) {
    return res.status(400).send({ message: err })
  }
}

module.exports.commentPost = (req, res) => {
  // If ID not found
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id)

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterFirstName: req.body.commenterFirstName,
            commenterLastName: req.body.commenterLastName,
            commenterJob: req.body.commenterJob,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(400).send({ message: err }))
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports.editCommentPost = (req, res) => {
  // If ID not found
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id)

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      )

      if (!theComment) return res.status(404).send("Comment not found")
      theComment.text = req.body.text

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs)
        return res.status(500).send(err)
      })
    })
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports.deleteCommentPost = (req, res) => {
  // If ID not found
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id)

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs)
        else return res.status(400).send(err)
      }
    )
  } catch (err) {
    res.status(400).send(err)
  }
}
