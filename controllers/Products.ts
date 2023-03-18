import Router from "express-promise-router";
import { Request, Response, NextFunction } from "express"
import 'express-async-errors';
import sharp from "sharp";
import multer from "multer";
import fs from "fs";
import storage from "../upload-config.js";
const upload = multer(storage);
import { uploadFile, deleteFile } from "../utils/s3.js";
 
import db from "../utils/db.js";
import { HttpError } from "http-errors";


export const router = Router();


router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  const { rows } = await db.query("SELECT * FROM products", []);
  res.send(rows);
  console.table(rows);
});

// router.post(
//   "/",
//   upload.single("image"),
//     async (req: Request, res: Response) => {
//     const key = req.file;
//     console.log(key);
//     const dateNow = `./uploads/${Date.now()}-resized.jpg`;
//     const image = await sharp(req.file!.path).resize(50, 50);

//     await image.toFile(dateNow);

//     console.log(dateNow);
//     const result = await uploadFile(dateNow, key);

//     console.log(result);
//     fs.unlinkSync(req.file!.path);
//     fs.unlinkSync(dateNow);

//   const { product_name, sku, location, count } = req.body;
//   const { rows } = await db.query(
//     "INSERT INTO products (product_name, sku, location, count) VALUES ($1, $2, $3, $4)",
//     [product_name, sku, location, count]
//   );
//   res.send(rows[0]);
// });

// router.put("/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { product_name, sku, location, count } = req.body;
//   const { rows } = await db.query(
//     "UPDATE products SET product_name = $1, sku = $2, location = $3, count = $4 WHERE id = $5",
//     [product_name, sku, location, count, id]
//   );
//   res.send(rows[0]);
// });

// router.delete("/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { rows } = await db.query("DELETE FROM products WHERE id = $1", [id]);
//   res.send(rows[0]);
// });


// router.delete(
//   "/:id",
//     async (req, res, next) => {
//     const id = req.params.id;
//     const deletedRow = await Product.findByPk(id);
//     await deleteFile(deletedRow);

//     await Product.destroy({
//       where: { id: id },
//     });
//     res.status(204).send("OK");
//   })
// );

router.get("/error", async (err: HttpError, req: Request, res: Response) => {
  await res.send("The URL you are trying to reach does not exist.");
});

export default router;