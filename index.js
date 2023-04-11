const { log } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////// FILES SYNC //////////////////////////////////////////////////////////

// blocking synchronus way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `Marcin is the best chef ever. NOT`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("file written");
/////////////////////////////////FILES ASYNC ////////////////////////////////////////////////////////
//  non blocking asynchronus way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       const avocados = `${data2}, ${data3}`;
//       fs.writeFile(
//         "./txt/combinedAvocados.txt",
//         avocados,
//         "utf-8",
//         (err) => {}
//       );
//     });
//   });
// });

// console.log("This will log first !");

///////////////////////// SERVER //////////////////////////////
const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/home") {
    res.end("HOME PAGE");
  } else if (pathName === "/about") {
    res.end("ABOUT PAGE");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>404 PAGE</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("lISTENING FOR REQ ON PORT 8000");
});
