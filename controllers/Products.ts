const Router = require("express-promise-router");
import { Request, Response, NextFunction } from "express"
 
const db = require("../utils/db");

const router = new Router();
 
module.exports = router;


router.get("/all", async (req: Request, res: Response) => {
  const { rows } = await db.query("SELECT * FROM products");
  res.send(rows);
  console.table(rows);
});

// create post route with id, product_name, sku, location, count
router.post("/", async (req: Request, res: Response) => {
  const { product_name, sku, location, count } = req.body;
  const { rows } = await db.query(
    "INSERT INTO products (product_name, sku, location, count) VALUES ($1, $2, $3, $4)",
    [product_name, sku, location, count]
  );
  res.send(rows[0]);
});

// create put route with id, product_name, sku, location, count
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { product_name, sku, location, count } = req.body;
  const { rows } = await db.query(
    "UPDATE products SET product_name = $1, sku = $2, location = $3, count = $4 WHERE id = $5",
    [product_name, sku, location, count, id]
  );
  res.send(rows[0]);
});

// create delete route with id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await db.query("DELETE FROM products WHERE id = $1", [id]);
  res.send(rows[0]);
}
);
