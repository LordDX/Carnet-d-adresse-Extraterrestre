const express = require('express');
const router = express.Router();

let Utilisateur = require('../models/utilisateur');

let User = require('../models/user');

router.get('/add', ensureAuthenticated, function(req, res){
  res.render('add_utilisateur', {
    title:'Add utilisateur'
  });
});

router.post('/add', function(req, res){
  req.checkBody('username','UserName is required').notEmpty();

  let errors = req.validationErrors();

  if(errors){
    res.render('add_utilisateur', {
      title:'Add utilisateur',
      errors:errors
    });
  } else {
    let utilisateur = new Utilisateur();
    utilisateur.UserName = req.body.username;
    utilisateur.author = req.user._id;
    utilisateur.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','utilisateur Added');
        res.redirect('/');
      }
    });
  }
});

router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Utilisateur.findById(req.params.id, function(err, utilisateur){
    if(utilisateur.author != req.user._id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('edit_utilisateur', {
      title:'Edit utilisateur',
      utilisateur:utilisateur
    });
  });
});

router.post('/edit/:id', function(req, res){
  let utilisateur = {};
  utilisateur.UserName = req.body.username;
  utilisateur.author = req.body.author;
  let query = {_id:req.params.id}

  Utilisateur.update(query, utilisateur, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'utilisateur Updated');
      res.redirect('/');
    }
  });
});

router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Utilisateur.findById(req.params.id, function(err, utilisateur){
    if(utilisateur.author != req.user._id){
      res.status(500).send();
    } else {
      Utilisateur.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

router.get('/:id', function(req, res){
  Utilisateur.findById(req.params.id, function(err, utilisateur){
    User.findById(utilisateur.author, function(err, user){
      res.render('utilisateur', {
        utilisateur:utilisateur,
        author: user.UserName
      });
    });
  });
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
