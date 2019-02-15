let mongoose = require('mongoose');

let utilisateurSchema = mongoose.Schema({
  UserName:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
});

let Utilisateur = module.exports = mongoose.model('Utilisateur', utilisateurSchema);
