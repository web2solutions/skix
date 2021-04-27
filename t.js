/*
 TODO: describe the order of console's logs
*/
console.log("normal log 1");
 
setTimeout(() => {
   console.log("2 setTimeout");
}, 0);
 
(new Promise(resolve => resolve())).then(() => {
 console.log("3 promise");
});

// last executed
setImmediate(() => {
 console.log("4 setImediate");
});
 
for(let i = 0; i < 5; i++) {
  console.log(i);
}

// runs before promise and 
process.nextTick(() => {
  console.log("5 next tick");
});
 
console.log("normal log 6");
