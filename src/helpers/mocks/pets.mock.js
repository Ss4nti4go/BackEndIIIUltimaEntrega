import {Faker , es, en} from "@faker-js/faker";

const faker = new Faker({locale: [es, en]});
export function createMockPet() {
  return {
    name: faker.animal.cat(), 
    species: faker.helpers.arrayElement(['perro', 'gato', 'pájaro', 'pez', 'conejo']),
    age: faker.number.int({ min: 1, max: 10 }),
    adotped: faker.datatype.boolean(),
  };
}