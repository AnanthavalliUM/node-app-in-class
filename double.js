// console.log(process.argv)
const double = (n) => n * 2;
// console.log("the double is", double(100))
// console.log("the double is ", double(process.argv[2]));
//either we can use destructuring or array method process.argv[2]
const [, , num] = process.argv;
console.log("the double is ", double(num));
