import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [games, setGames] = useState([]);
  const [people, setPeople] = useState([]);
  const [error, setError] = useState("");
  
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [price, setPrice] = useState(0);
  const [platforms, setPlatforms] = useState("");
  const [genre, setGenre] = useState("");


  const [personName, setPersonName] = useState("");
  const [favGenre, setFavGenre] = useState("");
  const [prefPlat, setPrefPlat] = useState("");
  const [age, setAge] = useState(0);
  const [personId, setId] = useState("");


  const fetchGames = async() => {
    try {      
      const response = await axios.get("/api/games");
      console.log(response.data)
      setGames(response.data.games);
    } catch(error) {
      setError("error retrieving tickets: " + error);
    }
  }
  
  const createGame = async() => {
    try {
      await axios.post("/api/games", {game: game, price: price, genre: genre, platforms:platforms, name:name});
    } catch(error) {
      setError("error adding a ticket: " + error);
    }
  }
  const deleteOneGame = async(game) => {
    try {
      await axios.delete("/api/games/" + game.id);
    } catch(error) {
      setError("error deleting a game" + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchGames();
    fetchPeople();
  },[]);

  const addGame = async(e) => {
    e.preventDefault();
    await createGame();
    fetchGames();
    setGame("");
    setPrice(0);
    setGenre("");
    setPlatforms("");
    setName("");
  }

  const deleteGame = async(game) => {
    await deleteOneGame(game);
    fetchGames();
  }

const updateOneGame = async(game) => {
    try {
      await axios.put("/api/games/" + game.id, {price: price});
    } catch(error) {
      setError("error updating person: " + error);
    }
}

  const updateGame = async(game) => {
    await updateOneGame(game);
    fetchGames();
    setGame("");
    setPrice(0);
    setGenre("");
    setPlatforms("");
    setName("");
  }

// people



  const fetchPeople = async() => {
    try {      
      const response = await axios.get("/api/people");
      console.log(response.data)
      setPeople(response.data.person);
    } catch(error) {
      setError("error retrieving tickets: " + error);
    }
  }
  
  const createPerson = async() => {
    try {
      await axios.post("/api/people", {name: personName, favoriteGenre: favGenre, preferredPlatform: prefPlat, age: age});
    } catch(error) {
      setError("error adding a ticket: " + error);
    }
  }
  const deleteOnePerson = async(person) => {
    try {
      await axios.delete("/api/people/" + person.id);
    } catch(error) {
      setError("error deleting a game" + error);
    }
  }

  // fetch ticket data


const updateOnePerson = async(person) => {
    try {
      console.log(age)
   
      await axios.put("/api/people/" + person.id, {preferredPlatform: prefPlat, favoriteGenre:favGenre, age: age});
      console.log("Dome")
    } catch(error) {
      setError("error updating person: " + error);
    }
}

  const addPerson = async(e) => {
    e.preventDefault();
    await createPerson();
    fetchPeople();
    setPersonName("");
    setAge(0);
    setFavGenre("");
    setPrefPlat("");
  }
  
  const updatePerson = async(person) => {
    console.log("Hello, updating")

    await updateOnePerson(person);
    fetchPeople();
    setPersonName("");
    setAge(0);
    setFavGenre("");
    setPrefPlat("");
  }

  const deletePerson = async(person) => {
    await deleteOnePerson(person);
    fetchPeople();
  }


  // render results
  return (
    <div className="App">
      {error}
      
      <div className = "pageHeader">
        <h1 className = "pageDescHead">Christmas Wishlist!</h1>
        <div className = "pageDesc">This is a fun wishlist for the whole family! Add the gifts you know you want, the gifts you know your family wants, or if you don't know, let people know a few kinds of gifts you might like!</div>
      </div>
      
      <div className = "wishlist">
        <form className = "formWishlist" onSubmit={addGame}>
              <h1 className = "formHeader">Specific Gifts</h1>
              <div className = "inputFieldGame">
                <div>Gift Name:</div>
                <input type="text" value={game} onChange={e => setGame(e.target.value)} />
              </div>

              <div className = "inputFieldGame">
                <div>Price:</div>
                <input type= "number" value={price} onChange={e=>setPrice(e.target.value)}></input>
              </div>

              <div className = "inputFieldGame">
                <div>Type of Gift:</div>
                <input type= "text" value={genre} onChange={e=>setGenre(e.target.value)}></input>
              </div>

          
              <div className = "inputFieldGame">
                <div>Why this Gift?</div>
              <input type= "text" value={platforms} onChange={e=>setPlatforms(e.target.value)}></input>
              </div>
              
              <div className = "inputFieldGame">
                <div>Who's it for?</div>
                <input type= "text" value={name} onChange={e=>setName(e.target.value)}></input>
              </div>
          
              <input className = "submitButton submitGame" type="submit" value="Submit" />
        </form>
        <h2 className = "gamesHeader">Family Wishlist So Far...</h2>
        {games.map( game => (
          <div key={game.id} className="game">
            <div className = "gameInfo">
            
              <div className = "infoItemGame">
                <div className = "info">Gift Name:</div>
                <div>{game.game}</div>
              </div>  
  
              <div className = "infoItemGame">
                <div className = "info">Price:</div>
                <div>{game.price}</div>
              </div>  
              
              <div className = "infoItemGame">
                <div className = "info">Type of Gift:</div>
                <div>{game.genre}</div>
              </div>
  
              <div className = "infoItemGame">
                <div className = "info">Why this gift?</div>
                <div>{game.platforms}</div>
              </div>  
              
              <div className = "infoItemGame">
                <div className = "info">Who's it for?</div>
                <div>{game.name}</div>
              </div> 
              
            </div>
            <div className = "updateBlock">
              <div>
                <button onClick = {e => updateGame(game)}>Update Price</button>             
                <input className = "updateInput" type = "number" onChange = {e => setPrice(e.target.value)}/>
              </div>
              <button onClick={e => deleteGame(game)}>Delete</button>

            </div>    
          </div>
        ))}
      
      
      </div>
      
      <div className = "people">
      
      
          <form onSubmit={addPerson} className = "personForm">
              <h1 className = "formHeader">Add a kind of gift you might like!</h1>
        
              <div className = "inputFieldPerson">
                <div>Family Member:</div>
                <input type= "text"  onChange={e=>setPersonName(e.target.value)}></input>
              </div>
              
              <div className = "inputFieldPerson">
                <div>What things do you like?</div>
                <input type= "text" onChange={e=>setFavGenre(e.target.value)}></input>
              </div>
              <div className = "inputFieldPerson">
                <div>Are you picky?</div>
                <input type= "text" onChange={e=>setPrefPlat(e.target.value)}></input>
              </div>
            
              <div className = "inputFieldPerson">
                <div>What's the ballpark cost?</div>
                <input type= "number" onChange={e=>setAge(e.target.value)}></input>
              </div>
            
              
            <input className = "submitButton" type="submit" value="Submit" />
          </form>
      
      
        <h2 className = "personHeader">Family Member...</h2>
        {people.map( person => (
          <div key={person.id} className="person">
            <div className = "personInfo">
            
              <div className = "infoItemPerson">
                <div className = "info">Family Member:</div>
                <div>{person.name}</div>
              </div>  
  
              <div className = "infoItemPerson">
                <div className = "info">Things they like:</div>
                <div>{person.favoriteGenre}</div>
              </div>  
              
              <div className = "infoItemPerson">
                <div className = "info">Picky?</div>
                <div>{person.preferredPlatform}</div>
              </div>
  
              <div className = "infoItemPerson">
                <div className = "info">The gift will cost about...</div>
                <div>{person.age}</div>
              </div>  
            </div>
            <div className = "updateBlock">
            
              <div className = "updateInfo">
                <input className = "updateInput" type = "text" onChange = {e => setFavGenre(e.target.value)}/>
                <div>Update the type of gift.</div>
              </div>
              
              <div className = "updateInfo">
                <input className = "updateInput" type = "text" onChange = {e => setPrefPlat(e.target.value)}/>
                <div>Update whether they are picky or not</div>
              </div>
              
              <div className = "updateInfo">
                <input className = "updateInput" type = "number" onChange = {e => setAge(e.target.value)}/>
                <div>Update estimated cost.</div>
              </div>  
              
              <button onClick = {e => updatePerson(person)}>Update</button>
              <button onClick={e => deletePerson(person)}>Delete</button>
            </div>          

          </div>
        ))}    
      
      </div>
      
      <div className = "footer">
        <a href="https://github.com/pmmason127/CreativeProject4">Github Link</a>
      </div>
      
    </div>
  );
}

export default App;