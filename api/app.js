const express = require("express");
// const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
// const api = require("./api.json");
const app = express();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("api.json");
const api = low(adapter);
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
// api_key = gwargurainaokayuaquaqulia
// app.use(bodyParser.urlencoded({ extended: false }));
app.api = api;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ExampleApi",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["app.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the list of all the Method
 *     responses:
 *       200:
 *         description: The list of the Method
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    ApiKeyAuth:
 *        type: apiKey
 *        in: header
 *        name: api_key
 * security:
 *     - ApiKeyAuth: []
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get Example
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of method
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: The method description by id
 *       404:
 *         description: The method was not found
 */

app.get("/", (req, res) => {
  res.send(req.app.api.get("api"));
});
app.get("/:id", (req, res) => {
  console.log(req.query);
  if (req.query.api_key === "gwargurainaokayuaquaqulia") {
    if (!req.app.api.get("api").find({ id: req.params.id }).value()) {
      res.sendStatus(404);
    }
    res.send(req.app.api.get("api").find({ id: req.params.id }).value());
  } else {
    res.sendStatus(404);
  }
});

app.listen(8080, () => {
  console.log("start server");
});
