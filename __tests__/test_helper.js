const Product = require("../models/product");

const productsInDb = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = { productsInDb, initialProducts };
