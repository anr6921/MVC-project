const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');
const blizzard = require('blizzard.js').initialize({ apikey: 'eukzkp99e87djznr4s5ppgu6vgs5cgwp' });

let DomoModel = {};

// mongoose.Types.ObjectID is a function that converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: String,
    min: 0,
    required: true,
  },

  icon: {
    type: String,
    trim: true,
    required: true,
  },

  class: {
    type: String,
    trim: true,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.find(search).select('name age icon class').exec(callback);
};

const FindCharacter = (realm, name) => {
  // let search = blizzard.wow.character(['profile'], { origin: 'us', realm: 'Proudmoore', name: 'Vaeze' })
  // console.log(search);
  // console.log(blizzard.wow.character(['profile'], { origin: 'us', realm: 'Proudmoore', name: 'Vaeze' }))
  console.log('in find character');
  console.log(`REALM: ${realm}`);
  console.log(`NAME: ${name}`);

  return blizzard.wow.character(['profile'], { origin: 'us', realm, name });
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
module.exports.FindCharacter = FindCharacter;
