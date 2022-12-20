import dgram from "node:dgram";
import { PacketParser } from "./packetParser.js";
import { PingPacket } from "./packets/ping.js";

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", (msg, rinfo) => {
  log(msg);
  const packet = PacketParser.parse(msg);

  if (packet.type == PingPacket.type) {
    server.send(
      new PingPacket(packet.destination, packet.source).toBuffer(),
      rinfo.port,
      rinfo.address
    );
  }
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(30260, "0.0.0.0");

function log(message: Buffer) {
  console.log(`server got: ${JSON.stringify(message.toJSON().data)}`);
  console.log("server got:", message);
  console.log("=".repeat(15));
}
