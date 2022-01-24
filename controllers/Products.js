const asyncHandler = require("express-async-handler");
const inventoryRouter = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");
const storage = require("../upload-config");
const sharp = require("sharp");
const upload = multer(storage);
const path = require("path");
const fs = require("fs");

const { uploadFile, deleteFile } = require("../utils/s3");
// const upload = multer({ dest: "uploads/" });

/*eslint no-unused-vars: ["error", { "args": "none" }]*/

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
    const key = req.file;
    console.log(key);
    const dateNow = `./uploads/${Date.now()}-resized.jpg`;
    const image = await sharp(req.file.path).resize(50, 50);

    await image.toFile(dateNow);

    console.log(dateNow);
    const result = await uploadFile(dateNow, key);

    console.log(result);
    fs.unlinkSync(req.file.path);
    fs.unlinkSync(dateNow);
    const { product_name, sku, location, count } = req.body;
    if (
      !req.body.product_name ||
      !req.body.sku ||
      !req.body.location ||
      !req.body.count
    ) {
      return res.status(401).json({ error: "missing or invalid field" });
    }

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
    await deleteFile(deletedRow);

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
    await Product.update(
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
