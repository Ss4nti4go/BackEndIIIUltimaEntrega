import {Faker , es, en} from "@faker-js/faker";

const faker = new Faker({locale: [es, en]});

const createMockProduct = () => {
    const categories = [
        'Proteinas', 'Suplementos', 'Accesorios',
        'Vitaminas', 'Equipamiento', 'Calzado', 'Ropa', 'Otros'
    ];

    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number.parseInt(faker.commerce.price({ min: 1, max: 500 })),
        Image: faker.image.urlLoremFlickr({ category: 'nature', width: 150, height: 150 }),
        code: faker.string.alphanumeric(8), // string único
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.helpers.arrayElement(categories),
        status: true // opcional, pero es requerido según tu schema
    };
};

export { createMockProduct };
