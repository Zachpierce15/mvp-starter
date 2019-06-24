var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  username: {type: String, unique: true},
  favoritePeople: [],
  // favoritePlanets: [{name: String, obital_period: String, gravity: String, population: String, residents: [{name: String, birth_year: String, height: String, species: String, homeworld: String, gender: String, vehicles:[String]}]}]
});

var Item = mongoose.model('Item', itemSchema);
// ========= GET =============
var selectAll = function(query,callback) {
  Item.find({ username: query}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};
// ========== POST ============
let counter = 1;
const insertInfo = (data,res) => {
  console.log("Made it to insertInfo!" , data.user);
  Item.update(
    { 
      username: data.user
    },
    {
      $push: { favoritePeople:
       {name: data.person.name,
        birth_year: data.person.birth_year,
        height: data.person.height,
        species: data.person.species,
        homeworld: data.person.homeworld,
        gender: data.person.gender,
        vehicles: data.person.vehicles}
            }
          },
          { upsert: true },
          (err,response) => {
            if(err) {
              res.status(500).end("Failed to add to likes");
              console.log(err);
            } else {
              res.status(200).end("Added to likes")
              console.log("this worked!!!")
            }
          })
};
module.exports = {
  selectAll,
  insertInfo
}