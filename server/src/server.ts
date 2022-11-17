import express from "express";
import { routes } from "./routes/message.router";
import { socketProvider } from './providers/socket/socket.provider'
import "dotenv/config";
import "./providers/socket/emitter.provider"
import "./bot";
const cors = require("cors");
const APP_PORT    = 6432;
const SOCKET_PORT = 4534; 
const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(routes);
app.listen(APP_PORT, () => {
  console.log(`Listen on port ${APP_PORT}`);
});
socketProvider.listen(SOCKET_PORT, () => {
  console.log(`public socket available on port ${SOCKET_PORT}`)
})