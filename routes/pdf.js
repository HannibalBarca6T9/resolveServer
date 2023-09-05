const projectcontrollers = require("../controllers/project")
const pdfexport = require("../controllers/exportpdf")

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './exportpdf/');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,

})
router.post("/ajoutpdf", pdfexport.createpdf)