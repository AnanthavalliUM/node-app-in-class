const fs = require ('fs');
// const quote = "No pain no gain"
// fs.writeFile('./quote.html', quote, (err) => {
//     console.log("completed writing");
// })
const [, , nooffiles] = process.argv;
console.log(nooffiles)
const quote2 = "live more worry less" 
for(i= 1; i <= nooffiles; i++) {
    fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
        console.log("completed writing");
    })

}