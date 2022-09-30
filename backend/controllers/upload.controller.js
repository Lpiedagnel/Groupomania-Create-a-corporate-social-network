const UserModel = require("../models/user.model")
const fs = require("fs")
const { promisify } = require("util")
const pipeline = promisify(require("stream").pipeline)
const { uploadErrors } = require("../utils/errors.utils")

module.exports.uploadProfil = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    console.log(req.file.mimetype)
    try {
        if (req.file.mimetype != "image/jpg" && req.file.mimetype != "image/png" && req.file.mimetype != "image/jpeg")
            throw Error("invalid file")

        if (req.file.size > 500000) throw Error("Max size")
    } catch (err) {
        const errors = uploadErrors(err)
        return res.status(201).json({ errors })
    }

    const fileName = req.body.name + ".jpg"

    console.log(fileName)
    // Everything seems to work before that part
    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../../frontend/public/uploads/profil/${fileName}`
        )
    )
}