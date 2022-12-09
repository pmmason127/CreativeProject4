const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const gameSchema = new mongoose.Schema({
   game: String,
   price: Number,
   genre: String,
   platforms: String,
   name: String
});

const personSchema = new mongoose.Schema({
   name: String,
   favoriteGenre: String,
   preferredPlatform: String,
   age: Number
});

gameSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });
    
personSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });
    
gameSchema.set('toJSON', {
  virtuals: true
});    

personSchema.set('toJSON', {
  virtuals: true
});  
    
const Game = mongoose.model('Game', gameSchema);
const Person = mongoose.model('Person', personSchema);


app.get('/api/games', async (req, res) => {
  try {
    let games = await Game.find();
    res.send({games: games});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/games', async (req, res) => {
    const game = new Game({
    game: req.body.game,
    price: req.body.price,
    genre: req.body.genre,
    platforms: req.body.platforms,
    name: req.body.name,

  });
  try {
    await game.save();
    res.send({game:game});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/games/:id', async (req, res) => {
  try {
    await Game.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/games/:id', async (req, res) => {
    console.log("In Server update")
    try {
      let thisId = req.params.id;
      let newPrice = req.body.price;
      
      let foundGame = await Game.find({id:thisId})

      
      if (foundGame) {
          
          
       let updatedGame = await Game.findOneAndUpdate({id:thisId}, {price:newPrice}, {new:true})
          
          res.send(updatedGame)
      }
      
      else {
        res.status(404)
          .send("Sorry, that game doesn't exist");
      }
      
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }    
});

// Person API
app.get('/api/people', async (req, res) => {
  try {
    let person = await Person.find();
    res.send({person: person});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/people', async (req, res) => {
    const person = new Person({
    name: req.body.name,
    favoriteGenre: req.body.favoriteGenre,
    preferredPlatform: req.body.preferredPlatform,
    age: req.body.age,

  });
  try {
    await person.save();
    res.send({person:person});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/people/:id', async (req, res) => {
  try {
    await Person.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/people/:id', async(req, res) => {
    console.log("In Server update")
    try {
      let thisId = req.params.id;
      console.log(thisId)
      let favoriteGenre = req.body.favoriteGenre;
      let preferredPlatform = req.body.preferredPlatform;
      let newAge = parseInt(req.body.age);
      
      console.log(favoriteGenre)
      
      let foundPerson = await Person.find({id:thisId});

      if (foundPerson) {
          
          if (favoriteGenre == null || favoriteGenre.length == 0) {
              favoriteGenre = foundPerson.favoriteGenre
          }
          if (newAge == null || newAge == 0) {
              newAge = foundPerson.age
          }
          if (preferredPlatform == null || preferredPlatform.length == 0) {
              preferredPlatform = foundPerson.preferredPlatform
          }
          
          let updatedPerson = await Person.findOneAndUpdate({id:thisId}, {favoriteGenre:favoriteGenre, age:newAge, preferredPlatform:preferredPlatform} ,{ new:true})
          
          res.send(updatedPerson)
      }
      
      else {
        res.status(404)
          .send("Sorry, that game doesn't exist");
      }
      
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
});

app.listen(3000, () => console.log('Server listening on port 3000!'));