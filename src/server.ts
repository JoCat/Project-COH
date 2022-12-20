import dgram from "node:dgram";
import { Router } from "./router.js";

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.error(`Server error: ${err.name}\n`);
  console.error(`message: ${err.message}\n`);
  console.error(err.stack);
  server.close();
});

server.on("message", (message, { port, address }) => {
  log(message);

  const result = Router.route(message);
  if (result) server.send(result.toBuffer(), port, address);
});

server.on("listening", () => {
  const { address, port } = server.address();
  console.log(`Server listening ${address}:${port}`);
});

server.bind(30260, "0.0.0.0");

function log(message: Buffer) {
  console.log(`Server got: ${JSON.stringify(message.toJSON().data)}`);
  console.log("Server got:", message);
  console.log("=".repeat(15));
}
