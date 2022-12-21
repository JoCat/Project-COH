import { PacketParser } from "./packetParser.js";
import { MaybeConnectPacket } from "./packets/maybeConnect.js";
import { Packet } from "./packets/packet.js";
import { Packet3 } from "./packets/packet3.js";
import { SynPacket } from "./packets/syn.js";

export class Router {
  static route(message: Buffer) {
    const packet = PacketParser.parse(message);
    console.log(packet);

    if (packet.type === SynPacket.type && packet.flags === SynPacket.flags) {
      return new SynPacket(packet.destination, packet.source);
    }

    if (
      packet.type === MaybeConnectPacket.type &&
      packet.flags === MaybeConnectPacket.flags
    ) {
      return new MaybeConnectPacket(
        packet.destination,
        packet.source,
        packet.payload
      );
    }

    // TODO хз о чём пакет
    if (packet.type === Packet3.type && packet.flags === packet.flags) {
      return new Packet3(packet.destination, packet.source, packet.payload);
    }

    return new Packet(
      packet.destination,
      packet.source,
      packet.type,
      packet.flags,
      packet.payload
    );
  }
}
