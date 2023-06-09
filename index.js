const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTEmplate = require("./modules/replaceTemplate");
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

// FUNCTION TO REPLACE TEMPLATE PLACEHOLDERS

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const slugs = dataObject.map((el) => {
  return slugify(el.productName, { lower: true });
});
console.log(slugs);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    //map over data
    const cardsHtml = dataObject
      .map((product) => replaceTEmplate(templateCard, product))
      .join("");
    const pageHtml = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(pageHtml);
    // PRODUCT PAGE
  } else if (pathname === "/product") {
    const product = dataObject.find((el) => el.id === Number(query.id));
    const productHtml = replaceTEmplate(templateProduct, product);

    res.writeHead(200, {
      "Content-type": "text/html",
    });

    res.end(productHtml);
    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    // NOT FOUND PAGR
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
