import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../utils.js";

const opts= {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "CoderCommerce70435",
            description: "Documentacion API de CoderCommerce70435",
        },
    },
    apis: [`${__dirname}/docs/*.yaml`],
};

const swaggerSpecs= swaggerJSDoc(opts);

export default swaggerSpecs;