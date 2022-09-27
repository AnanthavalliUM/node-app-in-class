import express from "express";
import { client } from "../index.js";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";

const router = express.Router();

async function generatepassword(password){
  const No_of_rounds = 10;
  const salt = await bcrypt.genSalt(No_of_rounds); //random string
  const hashedpassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedpassword);
  return hashedpassword;
}

generatepassword("password123")


// app.get('/movies/:id', function(req, res){
//     const {name} = req.params;     //destructing
//     const movie = movies.filter((mv) => mv.name === name )  // to get array of objects we can use find & find always give element
    
// Create movies through mongo db we use post method and choose body and raw and json format in postman

    router.post("/signup", async function (req, res) {
      const { username , password } = req.body;
      const userfromdb = await client.db("b33we").collection("users").findOne({username: username});
      if(userfromdb){
        res.send({message: "Username already exist"});
      }
      else{
        const hashedpassword = await generatepassword(password)
      const result = await client.db("b33we").collection("users").insertOne({username: username, password: hashedpassword, });
      
      res.send(result);
      }
      
});


router.post("/login", async function (req, res) {
  const { username , password } = req.body;
  const userfromdb = await client.db("b33we").collection("users").findOne({username: username});
  if(!userfromdb){
    res.send({message: "Invalid credentials"});
  }
  else{
    const storeddbpassword = userfromdb.password;
    const ispasswordmatch = await bcrypt.compare(password, storeddbpassword);
    if(ispasswordmatch){
      const token = jwt.sign({ id: userfromdb._id }, process.env.Secret_key)

      res.send({message: "Successful login", token: token});
    }
    else{
      res.send({message: "Invalid credentials"});

    }
  
  }
  
});


  
export const usersRouter = router;