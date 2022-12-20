import { PacketParser } from "./packetParser.js";
import { PingPacket } from "./packets/ping.js";

export class Router {
  static route(message: Buffer) {
    const packet = PacketParser.parse(message);

    if (packet.type == PingPacket.type) {
      return new PingPacket(packet.destination, packet.source);
    }

    return;
  }
}
