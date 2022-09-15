const Post = require('../models/Post')
const User = require('../models/User')
const fs = require('fs')

// Create a post and store it in the database
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post)
    delete postObject._id
    delete postObject._userId
    let post = new Post({
        ...postObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    post.save()
    .then(() => { res.status(201).json({message : "Message enregistré !"})})
    .catch(error => { res.status(400).json({ error })})
}

// Get specific post with ID
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post)
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            })
        }
    )
}

// Get all posts in the database
exports.getAllPost = (req, res, next) => {
    Post.find().then(
        (posts) => {
            res.status(200).json(posts)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}

// Find and modify a sauce with put method
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

    delete postObject._userId
    Post.findOne({_id: req.params.id})
    .then((post) => {
        if (post.userId != req.auth.userId) {
            res.status(401).json({ message : 'Utilisateur non autorisé '})
        } else {
            Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
            .then(() => res.status(200).json({message: "Message modifié !"}))
            .catch(error => res.status(401).json({ error }))
        }
    })
    .catch((error) => {
        res.status(400).json({ error })
    })
}

// Get specific sauce and delete with delete method.
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
    .then(post => {
        if (post.userId != req.auth.userId) {
            res.status(403).json({message: "Utilisateur non autorisé !"})
        } else {
            const filename = post.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({ message: "Message supprimé !"})})
                .catch(error => res.status(401).json({ error }))
            })
        }
    })
    .catch( error => {
        res.status(500).json({ error })
    })
}
