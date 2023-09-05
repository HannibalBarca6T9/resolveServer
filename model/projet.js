const mongoose = require('mongoose');

const projetschema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    Adresse:{
        type:String
    },
    Nombrelogement:{
        Type:Number
    },
    Entreprise:{
  type:[String]
    },
    photo: {
        type:String
    },
   pdf:[{
       type: mongoose.Schema.Types.ObjectId,
       ref:'pdffile'
    }],
    entreprise: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'entreprise'
    }],
    pdfexports: {
        type: String,
        
    },

});


module.exports = mongoose.model('projet', projetschema);

