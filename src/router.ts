import { SynAckPacket } from "./packets/synAck.js";
import { Packet } from "./packets/packet.js";
import { ConnectPacket } from "./packets/connect.js";
import { SynPacket } from "./packets/syn.js";

export class Router {
  static route(message: Buffer) {
    const packet = Packet.fromRawPacket(message);
    console.log(packet);

    if (
      packet.type === SynPacket.type &&
      packet.includesFlags(SynPacket.flags)
    ) {
      return new SynPacket(packet.destination, packet.source);
    }

    if (
      packet.type === SynAckPacket.type &&
      packet.includesFlags(SynAckPacket.flags)
    ) {
      return new SynAckPacket(
        packet.destination,
        packet.source,
        packet.payload
      );
    }

    if (
      packet.type === ConnectPacket.type &&
      packet.includesFlags(ConnectPacket.flags)
    ) {
      return new ConnectPacket(
        packet.destination,
        packet.source,
        packet.payload
      );
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
