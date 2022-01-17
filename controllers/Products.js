const asyncHandler = require("express-async-handler");
const inventoryRouter = require("express").Router();
const Product = require("../models/product");
const { uploadFile, deleteFile } = require("./../utils/s3");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

inventoryRouter.get(
  "/all",
  asyncHandler(async (req, res, next) => {
    const products = await Product.findAll();
    res.json(products);
  })
);

inventoryRouter.post(
  "/",
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    const file = req.file;
    if (!file) {
      return res.status(401).json({ error: "missing file upload" });
    }
    const body = req.body;
    const { product_name, sku, location, count } = req.body;
    if (!product_name || !sku || !location || !count) {
      return res.status(401).json({ error: "missing or invalid field" });
    }
    const result = await uploadFile(file);

    const newProduct = await Product.create({
      product_name: body.product_name,
      sku: body.sku,
      location: body.location,
      count: body.count,
      image: result.Location,
      awskey: result.Key,
    });

    res.json(newProduct);
  })
);

inventoryRouter.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const deletedRow = await Product.findByPk(id);
    // const result = await deleteFile(deletedRow);

    await Product.destroy({
      where: { id: id },
    });
    res.status(204).send("OK");
  })
);

inventoryRouter.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
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
          id: id,
        },
      }
    );
    const returnUpdatedProduct = await Product.findByPk(id);
    if (!returnUpdatedProduct) throw "Error while Fetching Data";
    res.status(200).json(returnUpdatedProduct);
  })
);

inventoryRouter.get("/error", (req, res) => {
  res.send("The URL you are trying to reach does not exist.");
});

module.exports = inventoryRouter;
