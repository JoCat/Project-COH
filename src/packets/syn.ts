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
      Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200])
    );
  }
}
