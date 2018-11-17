const models = require('../models');
const Domo = models.Domo;

const weasel = require('weasel.js'); // node wrapper to help with retrieving data from warcraft logs api

// public api key from warcraftlogs.com
//weasel.setApiKey('dbb582015929bacb732d472946e286d1');

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

/*
const findCharacter = (name, realm, location) => {
  weasel.setApiKey('dbb582015929bacb732d472946e286d1');
  let params = {};
  weasel.getReportsUser(name, realm, location, params, function(err, data){
    if(err){
      console.log(err);
      return;
    }
    console.log(data);
    //return data;
  });
};*/

const saveCharacter = (req, res, result) => {
  console.log("result: "+result);
  var data = JSON.parse(result);
  console.log("data: "+data);
  console.dir(data);

  const domoData = {
    name: data.name,
    age: data.realm,
    icon: data.thumbnail,
    class: data.class,
    owner: req.session.account._id,
  };

  console.dir(domoData);

  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'You already have this character saved.' });
    }

    return res.status(400).json({ error: 'an error has occured' });
  });
  return domoPromise;
};


const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'both name and realm required' });
  }

  const search = Domo.FindCharacter(req, res, res.name, 'us', res.age);
  
  search.then(response => {
    res.writeHead(200, { "Content-Type": "application/json"});
    //stringify json for HTTP  
    res.write(JSON.stringify(response.data));
    //send response to client
    res.end();
  
    return saveCharacter(req, res, JSON.stringify(response.data));
  });
  //search.then(() => res.json({redirect: '/maker'}));

  //catch errors thrown from blizzard api call
  search.catch((err) => {
    console.log(err);
    res.writeHead(400, { "Content-Type": "application/json"});
    res.write(JSON.stringify(responseMessage));
    res.end();
    return res.status(400).json({ error: 'an error has occured' });
  });

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  
  
  return search;

  //let character = findCharacter(req.body.name, 'Proudmoore', 'US');

  //console.log(character);
  
  /*
  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'You already have this character saved.' });
    }

    return res.status(400).json({ error: 'an error has occured' });
  });*/
  return domoPromise;
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if(err){
      console.log(err);
      return res.status(400).json({ error: 'An error occurred'});
    }

    return res.json({ domos: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getDomos = getDomos;
module.exports.make = makeDomo;
