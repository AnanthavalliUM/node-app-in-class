import express from "express";
import { client } from "../index.js";
import { auth } from "../middleware/auth.js"
const router = express.Router();


//grt movies by id
router.get('/:id', async function(req, res){
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

    router.post("/", async function (req, res) {
      const movies = req.body;
      console.log(movies);
      const result = await client.db("b33we").collection("movies").insertMany(movies);
      res.send(result)
});
// app.post("/mobiles", function (req,res) {
//   const mobiles = req.body;
//   const result = db.("b33").collection("mobiles").insertMany(mobiles);
//   res.send(result)
// })

  //to get all movies through mongodb
  router.get("/",  auth, async function (request, response) {
    console.log(request.query);
    const { name } = request.query;
    const movies = await client.db("b33we").collection("movies").find({}).toArray(); //to convert cursor to Array
  response.send(movies);
  }); 

router.delete("/:id", async function (request,response) {
  console.log(request.query);
  const { id } = request.params;
  const deletemovies = await client.db("b33we").collection("movies").deleteOne({id: id});
  response.send(deletemovies); 
});

router.put("/:id", async function (request,response) {
  const { id } = request.params;
  const data = request.body;
  const updatemovies = await client.db("b33we").collection("movies").updateOne({id: id} , { $set: data });
  response.send(updatemovies); 
});
  
export const moviesRouter = router;