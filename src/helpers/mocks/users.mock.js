import { Faker, es, en } from "@faker-js/faker";

const faker = new Faker({ locale: [es, en] });

const createMockUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    first_name: firstName,
    last_name: lastName,
    full_name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password(),
    age: faker.number.int({ min: 1, max: 100 }),
    role: faker.helpers.arrayElement(['admin', 'user']),
    pets: []
  };
};

export { createMockUser };
