const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../frontend/public/uploads/profil`)
    },
    filename: (req, file, cb) => {
        const name = req.body.name.toLowerCase().split(' ').join('_')
        console.log(name)
        cb(null, name + '.jpg')
    }
})

module.exports = multer({
    storage: storage,
    // Check mimetype
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            return cb(new Error('Le format du fichier n\'est pas valide. L\'image doit être au format JPG, JPEG ou PNG'), false);
         }
         cb(null, true);
       },
    // Check size of file
    limits: { fileSize: 1 * 1000 * 1000}
    }).single('avatar')