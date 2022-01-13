const inventoryRouter = require("express").Router();
const Product = require("../models/Product");

inventoryRouter.get("test", (req, res) => {
  res.status(200).send("OK");
});

inventoryRouter.get("/all", async (req, res) => {
  try {
    const products = await Product.findAll();
    console.log(products);
    res.json(products);
  } catch (e) {
    console.log(e);
  }
});

inventoryRouter.post("/", async (req, res) => {
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

inventoryRouter.delete("/:id", async (req, res) => {
  try {
    await Product.destroy({
      where: { id: req.params.id },
    });
  } catch (e) {
    console.log(e);
  }
});

inventoryRouter.put("/:id", async (req, res) => {
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

module.exports = inventoryRouter;
