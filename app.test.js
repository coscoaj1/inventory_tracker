const app = require("./app");
const supertest = require("supertest");

const api = supertest(app);

describe("POST /inventory", () => {
  test("given the item name, SKU, location, and count", async () => {
    //should save the item name, id, SKU, location and count to the database
    //should return json object containing item id
    //should return status code 200
    //should specify json in content-type header
    const response = await api
      .post("/inventory")
      .send({
        product_name: "candy",
        sku: "123",
        location: "A1",
        count: 13,
        id: 1,
      })
      .expect(200);
  });

  test("response has product id", async () => {
    const response = await api.post("/inventory").send({
      product_name: "candy",
      sku: "123",
      location: "A1",
      count: 13,
      id: 1,
    });
    expect(response.body.id).toBeDefined;
  });

  test("content type is application/json", async () => {
    const response = await api
      .post("/inventory")
      .send({
        product_name: "candy",
        sku: "123",
        location: "A1",
        count: 13,
        id: 0,
      })
      .expect("Content-Type", /application\/json/);
  });
  test("when the product name is missing", async () => {
    const newProduct = {
      sku: "123",
      location: "A1",
      count: 13,
      id: 0,
    };
    const response = await api.post("/inventory").send(newProduct).expect(401);
  });
});
