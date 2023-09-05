const express = require("express");
const router = express.Router();
const projectcontrollers = require("../controllers/project");
const chartcontrollers = require("../controllers/chart");
const entreprisecontrollers = require("../controllers/entreprise");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
router.post(
  "/ajoutcategorie",
  upload.any("image"),
  projectcontrollers.createcategorie
);
router.post(
  "/ajoutprojet/:id",
  upload.any("files", 30),
  upload.any("image"),
  projectcontrollers.createProject
);
router.get("/getallcategorie", projectcontrollers.getcategorie);
router.get("/getallproject", projectcontrollers.getProject);
router.get("/getallchart/:id", chartcontrollers.gettotalchart);
router.get("/getonechart/:id", chartcontrollers.getonechart);
router.get("/getoneprojet/:id", projectcontrollers.getoneproject);
router.get("/getonecategorie/:id", projectcontrollers.getonecategorie);
router.post("/ajoutentreprise/:id", entreprisecontrollers.addentreprise);
router.delete("/deletecategorie/:id", projectcontrollers.deletecategorie);
router.delete("/deleteproject/:id", projectcontrollers.deleteprojet);

module.exports = router;
