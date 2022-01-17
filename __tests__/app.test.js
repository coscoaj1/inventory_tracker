const app = require("../app");
const supertest = require("supertest");
const path = require("path");
const api = supertest(app);

describe("POST /inventory", () => {
  test("given the item name, SKU, location, and count", async () => {
    //should upload image, save the item name, id, SKU, location and count to the database
    //should return status code 200
    const response = await api
      .post("/api/inventory")
      .attach(
        "image",
        path.resolve(__dirname, "../uploads/f5c548e946f1fa409c73a028825c4339")
      )
      .field({
        product_name: "candy",
        sku: "123",
        location: "A1",
        count: 13,
        image: "abc",
        awskey: "1",
      })
      .expect(200);
      .expect("Content-Type", /application\/json/);

  });

  test("response has product id", async () => {
    //should return json object containing item id
    const response = await api
      .post("/api/inventory")
      .attach(
        "image",
        path.resolve(__dirname, "../uploads/f5c548e946f1fa409c73a028825c4339")
      )
      .field({
        product_name: "candy",
        sku: "123",
        location: "A1",
        count: 13,
        image:
          "https://inventory-tracker.s3.amazonaws.com/c0f69f52643f76e865e5b4cddaa297a7",
        awskey: "1",
      });
    expect(response.body.id).toBeDefined;
  });

  
  test("when the product name or sku and is missing", async () => {
    const newProduct = {
      location: "A1",
      count: 13,
    };
    const response = await api
      .post("/api/inventory")
      .attach(
        "image",
        path.resolve(__dirname, "../uploads/f5c548e946f1fa409c73a028825c4339")
      )
      .field(newProduct)
      .expect(401);
  });

  
  test("when the location or count is missing", async () => {
    const newProduct = {
      product_name: "candy",
      sku: "123",
    };
    const response = await api
      .post("/api/inventory")
      .attach(
        "image",
        path.resolve(__dirname, "../uploads/f5c548e946f1fa409c73a028825c4339")
      )
      .field("/api/inventory")
      .send(newProduct)
      .expect(401);
  });

});

describe("GET /inventory/all", () => {
  test("products are returned as json", async () => {
    const response = await api
      .get("/api/inventory/all")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("if a user navigates to invalid page", async () => {
    const response = await api.get("/api/inventory/abcdef").expect(302);
  });
});
