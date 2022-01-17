const Product = require("../models/Product");

const productsInDb = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = { productsInDb };
