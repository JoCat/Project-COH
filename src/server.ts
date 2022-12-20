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

  if (packet.payload.equals(PingPacket.incomingPayload)) {
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
// Eh640EB40B
// 0BB40E64Eh
// 3f 31 20 00 00 00 00 00 00 00 00 00 00 00 c8

// console.log(Buffer.from("3f31200000000000000000000000c8", "hex"));
// console.log(Buffer.from("313f200000000000000000000000c8", "hex"));
// 4E E6 40 BB

function log(message: Buffer) {
  console.log(`server got: ${JSON.stringify(message.toJSON().data)}`);
  console.log("server got:", message);
}
