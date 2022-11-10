import express from "express";
import { routes } from "./routes/message.router";
import "dotenv/config";
import "./bot";
const cors = require("cors");
const PORT = 6432;
const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(routes);
app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
