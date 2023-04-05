const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `Marcin is the best chef ever. NOT`;
fs.writeFileSync("./txt/output.txt", textOut);

console.log("file written");
