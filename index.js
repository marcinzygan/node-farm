const fs = require("fs");
// blocking synchronus way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `Marcin is the best chef ever. NOT`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("file written");

//  non blocking asynchronus way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      const avocados = `${data2}, ${data3}`;
      fs.writeFile(
        "./txt/combinedAvocados.txt",
        avocados,
        "utf-8",
        (err) => {}
      );
    });
  });
});

console.log("This will log first !");
