import express from "express";
import { setupDBConnection } from "./config/dbConnection";
import { Environment } from "./constants/Environment";
import router from "./routes";
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

setupDBConnection();

app.listen(Environment.PORT_NUMBER, () => {
  console.log(
    `This application is listening on port:${Environment.PORT_NUMBER} `
  );
});
