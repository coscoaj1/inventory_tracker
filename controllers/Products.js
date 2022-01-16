const inventoryRouter = require("express").Router();
const Product = require("../models/product");
const { uploadFile } = require("./../utils/s3");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

inventoryRouter.get("/all", async (req, res, next) => {
  let products;
  try {
    products = await Product.findAll();
    console.log(products);
  } catch (error) {
    next(error);
  }
  res.json(products);
});

inventoryRouter.post("/", upload.single("image"), async (req, res, next) => {
  let newProduct;
  const file = req.file;
  const body = req.body;
  const { product_name, sku, location, count } = req.body;
  if (!product_name || !sku || !location || !count) {
    return res.status(401).json({ error: "missing or invalid field" });
  }
  const result = await uploadFile(file);

  newProduct = await Product.create({
    product_name: body.product_name,
    sku: body.sku,
    location: body.location,
    count: body.count,
    image: result.Location,
  }).catch((error) => {
    next(error);
  });

  res.json(newProduct);
});

inventoryRouter.delete("/:id", async (req, res, next) => {
  await Product.destroy({
    where: { id: req.params.id },
  }).catch((error) => {
    next(error);
  });
  res.status(204).send("OK");
});

inventoryRouter.put("/:id", async (req, res, next) => {
  const body = req.body;

  const updatedProduct = await Product.update(
    {
      product_name: body.product_name,
      sku: body.sku,
      location: body.location,
      count: body.count,
      image: body.image,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).catch((error) => {
    next(error);
  });
  const returnUpdatedProduct = await Product.findByPk(req.params.id);
  if (!returnUpdatedProduct) throw "Error while Fetching Data";
  res.status(200).json(returnUpdatedProduct);
});

inventoryRouter.get("/error", (req, res) => {
  res.send("The URL you are trying to reach does not exist.");
});

module.exports = inventoryRouter;
