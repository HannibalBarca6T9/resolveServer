const reserve = require("../model/reserve");
const pdfreserve = require("../model/reservepdf");
const projet = require("../model/projet");

const entreprise = require("../model/Entreprise");
exports.createreserve = async (req, res) => {
  try {
    let new_reserve = new reserve({
      numero: req.body.numero,
      Entreprise: req.body.Entreprise,
      libele: req.body.libele,
      Support: req.body.Support,
      Nature: req.body.Nature,
      type: req.body.type,
      Zone: req.body.Zone,
      Perioriter: req.body.Perioriter,
      Datedepot: req.body.Datedepot,
      datelivraison: req.body.datelivraison,
      Commentaire: req.body.Commentaire,
    });
    // if (req.files && req.files.length > 0) {
    //   new_reserve.photo = req.files.map(
    //     (file) => "http://127.0.0.1:2049/" + file.path
    //   );
    // }
    if (req.files && req.files.length >= 2) {
      new_reserve.photo = "http://127.0.0.1:3000/" + req.files[0].path;
      new_reserve.ScreenShot = "http://127.0.0.1:3000/" + req.files[1].path;
    }

    const resultat = await new_reserve.save();
    await pdfreserve.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { reserve: resultat._id } }
    );
    await entreprise.findByIdAndUpdate(
      { _id: req.body.id },
      { $push: { reserve: resultat._id } }
    );
    res.status(200).json({
      result: resultat,
      message: "votre reserve a eteer ajouter avec suuces",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("error d'ajouter votre resrve");
  }
};

exports.getReserve = async (req, res) => {
  try {
    let resultat = await projet.findById(req.params.id).populate({
      path: "pdf",
      populate: {
        path: "reserve",
      },
    });
    res.status(200).json({ resut: resultat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

exports.updatestatus = async (req, res) => {
  try {
    let updatereserve = {
      statu: true,
    };
    await reserve.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      ...updatereserve,
      { new: true }
    );
  } catch (error) {}
};
