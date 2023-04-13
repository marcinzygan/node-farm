module.exports = function (temp, product) {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%ORIGIN%}/g, product.from);
  output = output.replace(/{%PRODUCT_NUTRIENTS_NAME%}/g, product.nutrients);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};
