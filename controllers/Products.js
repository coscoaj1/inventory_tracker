const asyncHandler = require("express-async-handler");
const inventoryRouter = require("express").Router();
const Product = require("../models/Product");
const { uploadFile, deleteFile } = require("../utils/s3");
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
    const result = await uploadFile(file);

    const { product_name, sku, location, count } = req.body;
    const { Location, Key } = result;

    const newProduct = await Product.create({
      product_name: product_name,
      sku: sku,
      location: location,
      count: count,
      image: Location,
      awskey: Key,
    });

    res.json(newProduct);
  })
);

inventoryRouter.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const deletedRow = await Product.findByPk(id);
    const result = await deleteFile(deletedRow);

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

    res.status(200).json(returnUpdatedProduct);
  })
);

inventoryRouter.get("/error", (req, res) => {
  res.send("The URL you are trying to reach does not exist.");
});

module.exports = inventoryRouter;
