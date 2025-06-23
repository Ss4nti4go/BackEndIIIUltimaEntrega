import CustomRouter from '../../helpers/CustomRouter.js';
import { productsService, userService } from "../../services/services.js";
import  {createMockProduct} from '../../helpers/mocks/products.mock.js';
import  {createMockUser}  from '../../helpers/mocks/users.mock.js'; 
import  {createMockPet}  from '../../helpers/mocks/pets.mock.js';   
import {petsService} from '../../services/services.js';
import bcrypt from "bcrypt";

class MockRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {

 
    this.read("/products/:n", ["PUBLIC"], async (req, res) => {
      const { n } = req.params;
      for (let i = 0; i < n; i++) {
        const one = createMockProduct();
        await productsService.createOne(one);
      }
      res.json201({ inserted: Number(n), type: "products" });
    });


    this.read("/users/:n", ["PUBLIC"], async (req, res) => {
      const { n } = req.params;
      for (let i = 0; i < n; i++) {
        let user = createMockUser();
        user.password = await bcrypt.hash("coder123", 10);
        await userService.createOne(user);
      }
      res.json201({ inserted: Number(n), type: "users" });
    });


    this.read("/mockingusers", ["PUBLIC"], async (req, res) => {
      const mocks = [];
      for (let i = 0; i < 50; i++) {
        const user = createMockUser();
        user.password = await bcrypt.hash("coder123", 10);
        mocks.push(user);
      }
      res.json200(mocks);
    });

  
    this.read("/mockingpets", ["PUBLIC"], async (req, res) => {
      const mocks = [];
      for (let i = 0; i < 20; i++) {
        const pet = createMockPet();
        mocks.push(pet);
      }
      res.json200(mocks);
    });

    this.create("/generateData", ["PUBLIC"], async (req, res) => {
      const { users = 0, pets = 0 } = req.query;
      let usersCreated = 0;
      let petsCreated = 0;

      for (let i = 0; i < Number(users); i++) {
        let user = createMockUser();
        user.password = await bcrypt.hash("coder123", 10);
        await userService.createOne(user);
        usersCreated++;
      }

      for (let i = 0; i < Number(pets); i++) {
        let pet = createMockPet();
        await petsService.createOne(pet);
        petsCreated++;
      }

      res.json201({
        message: "Datos generados",
        usersCreated,
        petsCreated
      });
    });

  };
}

const MocksRouter = new MockRouter();
export default MocksRouter.getRouter();
