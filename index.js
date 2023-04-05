const fs = require("fs");
// blocking synchronus way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `Marcin is the best chef ever. NOT`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("file written");

//  non blocking asynchronus way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("This will log first !");
