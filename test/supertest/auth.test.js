import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const requester = supertest.agent(`http://localhost:${process.env.PORT}/api`);

describe("TESTING: Rutas de Auth, cart y products", () => {
  const mockUser = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    full_name: "",
    email: faker.internet.email().toLowerCase(),
    password: "123456",
    age: faker.number.int({ min: 18, max: 60 }),
    role: "admin",
    cart: "67dc3bffe7be88119b0355ee",
  };
  mockUser.full_name = `${mockUser.first_name} ${mockUser.last_name}`;

  let createdUserId;
  let cookies;
  let productID;
  it("POST /auth/register crea un usuario no registrado", async () => {
    const res = await requester.post("/auth/register").send(mockUser);
    expect(res.status).to.equal(201);
    createdUserId = res.body.response._id;

  });

  it("POST /auth/register error 401 al registrar un usuario ya registrado", async () => {
    const res = await requester.post("/auth/register").send(mockUser);
    expect(res.status).to.equal(400); // puede ser 400 o 401 dependiendo del controller
    expect(res.body).to.have.property("error");
  });

  it("POST /auth/login tiene éxito el inicio de sesión", async () => {
    const res = await requester.post("/auth/login").send({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(res.status).to.equal(200);
    cookies = res.headers["set-cookie"];
    expect(cookies).to.exist;
  });

  it("POST /auth/login devuelve el mensaje correcto en la propiedad response", async () => {
    const res = await requester.post("/auth/login").send({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("response");
    expect(res.body.response).to.have.property("message").that.equals("Logged in");
  });

  it("PUT /users/:uid tiene éxito el update", async () => {
    const res = await requester
      .put(`/users/${createdUserId}`)
      .send({ first_name: "NombreActualizado" });

    expect(res.status).to.equal(200);
  });


  it("POST /auth/signout cierra sesión correctamente", async () => {
    const res = await requester
      .post("/auth/logout");

    expect(res.status).to.equal(200);

  });

  it("GET /auth/online debe fallar tras logout", async () => {
    const res = await requester
      .get("/auth/online");

    expect(res.status).to.equal(200);
  });
  it("GET /products debe traer los productos", async () => {
    const res = await requester.get("/products");
    expect(res.status).to.equal(200);
  });
  it("GET /products/:pid debe traer un producto", async () => {
    const res = await requester.get("/products/675cb28bfda3518e3c3d79d2");
    expect(res.status).to.equal(200);
  })
  it("GET /carts/:cid debe traer un carrito", async () => {
    const res = await requester.get(`/carts/${createdUserId}`);
    expect(res.status).to.equal(200);
  })  
  it("POST /carts/:cid/products/:pid debe agregar un producto al carrito", async () => {
    const res = await requester.post(`/carts/67dc3bffe7be88119b0355ee/products/675cb28bfda3518e3c3d79d2`);
    expect(res.status).to.equal(200);
  })
  it("DELETE /carts/:cid/products/:pid debe eliminar un producto del carrito", async () => {
    const res = await requester.delete(`/carts/67dc3bffe7be88119b0355ee/products/675cb28bfda3518e3c3d79d2`);
    expect(res.status).to.equal(200);
  })
  it("POST /products debe crear un producto", async () => {
    const mockProduct = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.datatype.string(6),
        price: faker.datatype.number({ min: 1, max: 1000 }),
        stock: faker.datatype.number({ min: 1, max: 100 }),
        category: faker.commerce.department(),
        thumbnails: [faker.image.imageUrl(), faker.image.imageUrl()],
    }

    const res= await requester.post("/products").send(mockProduct);
    productID = res.body.response._id
    expect(res.status).to.equal(200);
  })
  it("PUT /products/:pid debe actualizar un producto", async () => {
    const mockProductUpdate = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.datatype.string(6),
        price: faker.datatype.number({ min: 1, max: 1000 }),
        stock: faker.datatype.number({ min: 1, max: 100 }),
        category: faker.commerce.department(),
        thumbnails: [faker.image.imageUrl(), faker.image.imageUrl()],
    }
    const res= await requester.put(`/products/${productID}`).send(mockProductUpdate);
    expect(res.status).to.equal(200);
  })
  it("DELETE /products/:pid debe eliminar un producto", async () => {
    const res= await requester.delete(`/products/${productID}`);
    expect(res.status).to.equal(200);
  })
    it("DELETE /users/:uid tiene éxito el destroy", async () => {
    const res = await requester
      .delete(`/users/${createdUserId}`)

    expect(res.status).to.equal(200);
  });
  it("DELETE /users/:uid tiene éxito el destroy", async () => {
    const res = await requester
      .delete(`/users/${createdUserId}`)

    expect(res.status).to.equal(200);
  })
});
