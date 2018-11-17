const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');
const blizzard = require('blizzard.js').initialize({ apikey: "eukzkp99e87djznr4s5ppgu6vgs5cgwp" });

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
  },

  class: {
    type: String,
    trim: true,
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

  return DomoModel.find(search).select('name age').exec(callback);
};

const FindCharacter = (req, res, name, origin, realm) => {
  //let search = blizzard.wow.character(['profile'], { origin: 'us', realm: 'Proudmoore', name: 'Vaeze' })
  //console.log(search);
  console.log(blizzard.wow.character(['profile'], { origin: 'us', realm: 'Proudmoore', name: 'Vaeze' }))
  return blizzard.wow.character(['profile'], { origin: 'us', realm: 'Proudmoore', name: 'Vaeze' });
  
  /*search.then(response => {
    //success
    res.writeHead(200, { "Content-Type": "application/json"});
    //stringify json to make it valid for HTTP  
    res.write(JSON.stringify(response.data));
    //send response to client
    res.end();
    console.log(response.data);
  });

  //catch errors thrown from blizz 
  search.catch(function (err) {
    console.error(err);
  
    //write error message for client
    var responseMessage = {
      error: "Could not find character"
    }
    res.writeHead(400, { "Content-Type": "application/json"});
    res.write(JSON.stringify(responseMessage));
    res.end();
  }); */
}

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
module.exports.FindCharacter = FindCharacter;
