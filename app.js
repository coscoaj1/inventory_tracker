const express = require("express");
const app = express();
const Product = require("./models/Product.js");

const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());

app.get("test", (req, res) => {
  res.status(200).send("OK");
});

app.get("/inventory/all", async (req, res) => {
  try {
    const products = await Product.findAll();
    console.log(products);
    res.json(products);
  } catch (e) {
    console.log(e);
  }
});

app.post("/inventory", async (req, res) => {
  try {
    const { product_name, sku, location, count } = req.body;
    const body = req.body;
    console.log(body);

    if (!product_name || !sku || !location || !count) {
      return res.status(401).json({ error: "missing or invalid field" });
    }

    const newProduct = await Product.create({
      product_name: body.product_name,
      sku: body.sku,
      location: body.location,
      count: body.count,
    });

    res.json(newProduct);
  } catch (e) {
    console.log(e);
  }
});

app.delete("/inventory/:id", async (req, res) => {
  try {
    await Product.destroy({
      where: { id: req.params.id },
    });
  } catch (e) {
    console.log(e);
  }
});

app.put("/inventory/:id", async (req, res) => {
  try {
    const body = req.body;

    const updatedProduct = await Product.update(
      {
        product_name: body.product_name,
        sku: body.sku,
        location: body.location,
        count: body.count,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const returnUpdatedProduct = await Product.findByPk(req.params.id); // finds the updated row
    if (!returnUpdatedProduct) throw "Error while Fetching Data"; //catches errors.
    res.status(200).json(returnUpdatedProduct); //sends updated data to frontend
  } catch (e) {
    console.log(e);
  }
});

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":url :method :response-time ms :body"));

module.exports = app;
