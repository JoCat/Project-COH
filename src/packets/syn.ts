import { Packet, PacketFlag, PacketType } from "./packet.js";

export class SynPacket extends Packet {
  static type = PacketType.SYN;
  static flags = [PacketFlag.FLAG_NEED_ACK];

  constructor(source: number, destination: number) {
    super(
      source,
      destination,
      SynPacket.type,
      SynPacket.flags,
      0,
      0,
      0,
      0,
      0,
      0,
      Buffer.alloc(0),
      200, // Checksum
      15
    );
  }
}
