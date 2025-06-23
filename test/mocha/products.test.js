import assert from "assert";
import { productsManager } from "../../src/dao/managers/mongo.manager.js";
import dbConnect from "../../src/helpers/dbConnect.helper.js";
import "dotenv/config.js";
import { expect } from "chai";

describe("TESTING: Servicio de productos", () => {
  let productID;

  before(async () => {
    await dbConnect(process.env.LINK_DB);
  });

  it("Debe crear un producto correctamente", async () => {
    const product = {
      title: "Producto Test",
      description: "Este es un producto de prueba",
      code: "TEST123",
      price: 199.99,
      stock: 50,
      category: "TestCategory",
      thumbnails: ["image1.jpg", "image2.jpg"],
    };

    const response = await productsManager.createOne(product);
    productID = response._id;

    expect(response).to.have.property("_id");
    expect(response.title).to.equal(product.title);
    expect(response.description).to.equal(product.description);
    expect(response.code).to.equal(product.code);
    expect(response.price).to.equal(product.price);
    expect(response.stock).to.equal(product.stock);
    expect(response.category).to.equal(product.category);
    expect(response.thumbnails).to.be.an("array");
  });

  it("Debe obtener todos los productos correctamente", async () => {
    const response = await productsManager.readAll();
    expect(response).to.be.an("array");
    expect(response.length).to.be.greaterThan(0);
  });

  it("No debe crear un producto con datos incompletos", async () => {
    try {
      await productsManager.createOne({});
      assert.fail("No debería crear producto sin datos");
    } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.be.a("string");
    }
  });

  it("Debe obtener un producto por ID correctamente", async () => {
    const response = await productsManager.readOne(productID);
    expect(response).to.have.property("_id");
    expect(response._id.toString()).to.equal(productID.toString());
  });

  it("Debe actualizar un producto correctamente", async () => {
    const update = { price: 149.99 };
    const response = await productsManager.updateOne(productID, update);

    expect(response).to.have.property("_id");
    expect(response.price).to.equal(update.price);
  });

  it("Debe eliminar un producto correctamente", async () => {
    const response = await productsManager.destroyOne(productID);

    expect(response).to.have.property("_id");
    expect(response._id.toString()).to.equal(productID.toString());

    const check = await productsManager.readOne(productID);
    expect(check).to.be.null;
  });
});
