const express = require("express");
const app = express();
const Product = require("./models/Product.js");

const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());

app.get("test", (req, res) => {
  res.status(200).send("OK");
});

app.post("/inventory", async (req, res) => {
  const { product_name, sku, location, count, id } = req.body;
  const body = req.body;
  console.log(body);

  if (!product_name || !sku || !location || !count || !id) {
    return res.status(401).json({ error: "missing or invalid field" });
  }

  const newProduct = await Product.create({
    product_name: body.product_name,
    sku: body.sku,
    location: body.location,
    count: body.count,
    id: body.id,
  });

  res.json(newProduct);
});

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":url :method :response-time ms :body"));

module.exports = app;
