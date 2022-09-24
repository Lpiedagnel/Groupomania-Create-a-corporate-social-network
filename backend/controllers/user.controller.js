const UserModel = require('../models/user.model')
const ObjectId = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password')
    res.status(200).json(users)
}

module.exports.userInfo = (req, res) => {
    // If ID not found
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID unknown: ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs) // Docs is the data of user
        else console.log('ID Unknown: ' + err)
    }).select('-password')
}

module.exports.updateUser = async (req, res) => {
    // If ID not found
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID unknown: ' + req.params.id)

    console.log(req.file.path)

    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio,
                    job: req.body.job,
                    picture: req.file.path
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        ).then((docs) => {
            if(docs === null){
              throw new Error('error')
                }
                res.send(docs)
              }).catch( (err) => {
                res.status(500).json({ message: err });
              })

    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.deleteUser = async (req, res) => {
        // If ID not found
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

        try {
            await UserModel.remove({ _id: req.params.id }).exec()
            res.status(200).json({ message : "Successfully deleted. "})
        } catch (err) {
            return res.status(500).json({ message: err })
        }
}

module.exports.follow = async (req, res) => {
        // If ID not found
        if (!ObjectId.isValid(req.params.id) || (!ObjectId.isValid(req.body.idToFollow)))
        return res.status(400).send('ID or ID to follow unknown: ' + req.params.id + ' and IDtoFollow: ' + req.body.idToFollow)

        try {
            // add to the follower list
            await UserModel.findByIdAndUpdate(
                { _id: req.params.id },
                { $addToSet: { following: req.body.idToFollow }},
                { new: true, upsert: true }
            )
            .then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(500).send({ message: err }))
            // add to following list
            await UserModel.findByIdAndUpdate(
                { _id: req.body.idToFollow},
                { $addToSet: { followers: req.params.id }},
                { new: true, upsert: true }
            )
            .catch((err) => res.status(500).send({ message: err }));
            
          } catch (err) {
            return res.status(500).json({ message: err })
          }
        }

module.exports.unfollow = async (req, res) => {
    // If ID not found
    if (!ObjectId.isValid(req.params.id) || (!ObjectId.isValid(req.body.idToUnfollow)))
    return res.status(400).send('ID or ID to follow unknown: ' + req.params.id + ' and IDtoFollow: ' + req.body.idToUnfollow)

    try {
        // Add to the followers list
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            { $pull: { following: req.body.idToUnfollow}},
            { new: true, upsert: true}, 
        )
        .then((docs) => res.status(201).json(docs))
        .catch((err) => res.status(500).send({ message: err }))
        // Add to following list
        await UserModel.findByIdAndUpdate(
            { _id: req.body.idToUnfollow},
            { $pull: { followers: req.params.id }},
            { new: true, upsert: true}, 
        ).catch((err) => res.status(500).send({ message: err }));

    } catch (err) {
        return res.status(500).json({ message: err })
    }
}