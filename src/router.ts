import { PacketParser } from "./packetParser.js";
import { MaybeConnectPacket } from "./packets/maybeConnect.js";
import { Packet } from "./packets/packet.js";
import { Packet3 } from "./packets/packet3.js";
import { PingPacket } from "./packets/ping.js";

export class Router {
  static route(message: Buffer) {
    const packet = PacketParser.parse(message);

    if (packet.type == PingPacket.type) {
      return new PingPacket(packet.destination, packet.source);
    }

    if (packet.type == MaybeConnectPacket.type) {
      return new MaybeConnectPacket(
        packet.destination,
        packet.source,
        packet.payload
      );
    }

    // TODO хз о чём пакет
    if (packet.type == Packet3.type) {
      return new Packet3(packet.destination, packet.source, packet.payload);
    }

    return new Packet(
      packet.destination,
      packet.source,
      packet.type,
      packet.payload
    );
  }
}
