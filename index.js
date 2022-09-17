import express, { response } from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
const app = express()
const port = 4000
dotenv.config()



// const MONGO_URL = "mongodb://127.0.0.1";  //--LOCAL HOST number
const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL ="mongodb+srv://valli:welcome@123@cluster0.md1noof.mongodb.net";
async function createConnection() 
{
  const client = new MongoClient(MONGO_URL); // phone dailawait 
  client.connect(); // call button
  console.log("Mongo is connected ✨🎊😎");
  return client;
}
  const client = await createConnection();
   
  app.use(express.json());


app.get('/', function (req, res) {
  res.send('Hello World 😊😜')
}) 


const movies = [
    {
      id: "100",
      name: "RRR",
      poster:
        "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
      rating: 8.8,
      summary:
        "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
      trailer: "https://www.youtube.com/embed/f_vbAtFSEc0"
    },
    {
      id: "101",
      name: "Iron man 2",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
      rating: 7,
      summary:
        "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
      trailer: "https://www.youtube.com/embed/wKtcmiifycU"
    },
    {
      id: "102",
      name: "No Country for Old Men",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
      rating: 8.1,
      summary:
        "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
      trailer: "https://www.youtube.com/embed/38A__WT3-o0"
    },
    {
      id: "103",
      name: "Jai Bhim",
      poster:
        "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
      summary:
        "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
      rating: 8.8,
      trailer: "https://www.youtube.com/embed/nnXpbTFrqXA"
    },
    {
      id: "104",
      name: "The Avengers",
      rating: 8,
      summary:
        "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
      poster:
        "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
      trailer: "https://www.youtube.com/embed/eOrNdBpGMv8"
    },
    {
      id: "105",
      name: "Interstellar",
      poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
      rating: 8.6,
      summary:
        "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
      trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
      id: "106",
      name: "Baahubali",
      poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
      rating: 8,
      summary:
        "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
      trailer: "https://www.youtube.com/embed/sOEg_YZQsTI"
    },
    {
      id: "107",
      name: "Ratatouille",
      poster:
        "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
      rating: 8,
      summary:
        "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
      trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w"
    }
  ];
  
// app.get('/movies', function(req, res){   // code to get all movies before connecting mongodb
//     res.send(movies)
// });
  
//code to get movies by id through mongo db
app.get('/movies/:id', async function(req, res){
    const {id} = req.params;     //destructing
    // const movie = movies.filter((mv) => mv.id === id )  // filter always give array

    const movie = await client.db("b33we").collection("movies").findOne({id: id})
    // const movie = movies.find((mv) => mv.id === id )  // to get array of objects we can use find & find always give element
    movie ? res.send(movie) : res.status(400).send({msg : "Movie not found"})
    console.log(movie)
});

// app.get('/movies/:id', function(req, res){
//     const {name} = req.params;     //destructing
//     const movie = movies.filter((mv) => mv.name === name )  // to get array of objects we can use find & find always give element
    
// Create movies through mongo db we use post method and choose body and raw and json format in postman

    app.post("/movies", async function (req, res) {
      const movies = req.body;
      console.log(movies);
      const result = await client.db("b33we").collection("movies").insertMany(movies);
      res.send(result)
});

  //to get all movies through mongodb
  app.get("/movies", async function (request, response) {
    console.log(request.query);
    const { name } = request.query;
    const movies = await client.db("b33we").collection("movies").find({}).toArray(); //to convert cursor to Array
  response.send(movies);
  }); 

app.delete("/movies/:id", async function (request,response) {
  console.log(request.query);
  const { id } = request.params;
  const deletemovies = await client.db("b33we").collection("movies").deleteOne({id: id});
  response.send(deletemovies); 
});

app.put("/movies/:id", async function (request,response) {
  const { id } = request.params;
  const data = request.body;
  const updatemovies = await client.db("b33we").collection("movies").updateOne({id: id} , { $set: data });
  response.send(updatemovies); 
});
  



app.listen(port, () => console.log(`The server started in: ${port}`)) 