const multer = require("multer")

module.exports.uploadFile = function (req, res, next) {
  let errors = { format: "", maxSize: "" }

  // Create storage parameters
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../../client/public/uploads/posts`)
    },
    filename: (req, file, cb) => {
      const name = req.body.posterId + Date.now()
      cb(null, name + ".jpg")
    },
  })

  // Send error if incorrect format:
  const sendErrorFormat = function () {
    errors.format = "Format incompatible"
    return res.status(201).json({ errors })
  }

  // Upload file with multer
  const upload = multer({
    storage: storage,
    // Check mimetype
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png"
      ) {
        return sendErrorFormat(), false
      }
      cb(null, true)
    },
    // Check size of file
    limits: { fileSize: 500000 },
  }).single("file")

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      errors.maxSize = "Le fichier dépasse 500ko"
      return res.status(201).json({ errors })
      // Unknow error
    } else if (err) {
      return res.status(500).json({ err })
    }
    next()
  })
}
