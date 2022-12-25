import dgram from "node:dgram";
import { Router } from "./router.js";

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.error(`Server error: ${err.name}`);
  console.error(`message: ${err.message}`);
  console.error(err.stack);
  server.close();
});

server.on("message", (message, { port, address }) => {
  log(message, "Server");

  const result = Router.route(message);
  if (result) {
    log(result.toBuffer(), "Client");
    server.send(result.toBuffer(), port, address);
  }
});

server.on("listening", () => {
  const { address, port } = server.address();
  console.log(`Server listening ${address}:${port}`);
});

server.bind(30260, "0.0.0.0");

function log(message: Buffer, target: string) {
  console.log(`${target} got:`);
  console.log(JSON.stringify(message.toJSON().data));
  console.log(message);
  console.log("=".repeat(30));
}
