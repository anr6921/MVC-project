const models = require('../models');
const Domo = models.Domo;

//const weasel = require('weasel.js'); // node wrapper to help with retrieving data from warcraft logs api

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

  var memClass;
  switch(data.class){
    case 0: break;
    case 1: memClass="Warrior";
        break;
    case 2: memClass="Paladin";
        break;
    case 3: memClass="Hunter";
        break;
    case 4: memClass="Rogue";
        break;
    case 5: memClass="Priest";
        break;
    case 6: memClass="DeathKnight";
        break;
    case 7: memClass="Shaman";
        break;
    case 8: memClass="Mage";
        break;
    case 9: memClass="Warlock";
        break;
    case 10: memClass="Monk";
        break;
    case 11: memClass="Druid";
        break;
    case 12: memClass="DemonHunter";
        break;
  } 

  const domoData = {
    name: data.name,
    age: data.realm,
    icon: data.thumbnail,
    class: memClass,
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

// Check that data has been entered correctly by user.
// Makes call to function to recieve data from API & writes response to head
// if new character, save. else search for character stats to display
const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'both name and realm required' });
  }
  //console.dir(res);

  const search = Domo.FindCharacter(req.body.age, req.body.name);
  
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
    //res.write(JSON.stringify(response));
    res.end();
    return res.status(400).json({ error: 'an error has occured' });
  });

  return search;
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

/*
const searchCharacter = (realm, name) => {

  console.log('realm: '+realm);
  console.log('name: '+name);
  const search = Domo.FindCharacter(realm, name);
  
  search.then(response => {
    res.writeHead(200, { "Content-Type": "application/json"});
    //stringify json for HTTP  
    res.write(JSON.stringify(response.data));
    //send response to client
    res.end();
    
    return JSON.stringify(response.data);
  });
  //search.then(() => res.json({redirect: '/maker'}));

  //catch errors thrown from blizzard api call
  search.catch((err) => {
    console.log(err);
    res.writeHead(400, { "Content-Type": "application/json"});
    //res.write(JSON.stringify(response));
    res.end();
    return res.status(400).json({ error: 'an error has occured' });
  });

  return search;
};*/


//search for a character in the wow api and return
const searchCharacter = (req, res) => {
  /*if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'both name and realm required' });
  }*/
  
  console.log(req.body.age);
  console.log(req.body.name);
  const search = Domo.FindCharacter('Proudmoore', 'Vaeze');
  
  //search.then(() => res.json({redirect: '/maker'}));
  // parse out returned JSON
  search.then(response => {
    console.log('inside searchCharacter .t');
    res.writeHead(200, { "Content-Type": "application/json"});
  

    //stringify json for HTTP  
    res.write(JSON.stringify(response.data));
    //send response to client
    res.end();
    return parseSearchCharacter(req, res, JSON.stringify(response.data));
    
     //res.send(search);
  });
  //return search.send();
  search.then(() => res.json({ redirect: '/maker' }));
  //search.then(() => res.json({redirect: '/maker'}));
  //catch errors thrown from blizzard api call
  search.catch((err) => {
    console.log(err);
    res.writeHead(400, { "Content-Type": "application/json"});
    //res.write(JSON.stringify(response));
    res.end();
    return res.status(400).json({ error: 'an error has occured' });
  });

  
  console.log('returning search boi');
  return search;
};

// character search parse
const parseSearchCharacter = (req, res, result) => {
  console.log("result: "+result);
  var data = JSON.parse(result);
  console.log("data: "+data);
  console.dir(data);

  var memClass;
  switch(data.class){
    case 0: break;
    case 1: memClass="Warrior";
        break;
    case 2: memClass="Paladin";
        break;
    case 3: memClass="Hunter";
        break;
    case 4: memClass="Rogue";
        break;
    case 5: memClass="Priest";
        break;
    case 6: memClass="DeathKnight";
        break;
    case 7: memClass="Shaman";
        break;
    case 8: memClass="Mage";
        break;
    case 9: memClass="Warlock";
        break;
    case 10: memClass="Monk";
        break;
    case 11: memClass="Druid";
        break;
    case 12: memClass="DemonHunter";
        break;
  } 

  // return character data needed
  const data2 = {
    name: result.name,
    age: result.realm,
    icon: result.thumbnail,
    class: memClass,
    level: result.level,
    redirect: '/maker',
  };

  console.dir(data2);

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
  console.log('returning PARSED CHARACTER');
  return res.json({ redirect: '/maker' });
};

// redirect to 404
const notFound = (req, res) => {
  res.render('notFound', {csrfToken:req.csrfToken()});
};


//module.exports.searchCharacter = searchCharacter;
module.exports.makerPage = makerPage;
module.exports.getDomos = getDomos;
module.exports.make = makeDomo;
module.exports.searchCharacter = searchCharacter;
module.exports.notFound = notFound;