const fs = require ('fs');

fs.readFile("./cool.txt", "utf-8", (err, data) => {
    if(err){
        console.log(error);
    }
    else{
        console.log(data);
    }
}); 

// it will append or add with fun.html
const quote3 = "Think big"
fs.appendFile("./fun.html", "\n" + quote3, (err) => {
    console.log("completed writing");
});

// delete files
fs.unlink("./delete.js", (err) => {
    if(err){
       console.log("error");
    }
    else{
        console.log("deleted");
    }
})