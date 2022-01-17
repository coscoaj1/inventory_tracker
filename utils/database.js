const Product = require("../models/product");

const getProducts = async () => {
  const products = await Product.findAll();
  return products;
};

const addProduct = async (body, result) => {
  const newProduct = await Product.create({
    product_name: body.product_name,
    sku: body.sku,
    location: body.location,
    count: body.count,
    image: result.Location,
  });
  return newProduct;
};

module.exports = { getProducts, addProduct };
