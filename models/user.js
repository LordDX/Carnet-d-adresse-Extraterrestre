const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  age:{
    type: Number,
    required: true
  },
  family:{
    type: String,
    required: true
  },
  food:{
    type: String,
    required: true
  },
  race:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
