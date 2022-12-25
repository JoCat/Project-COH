import { Packet, PacketFlag, PacketType } from "./packet.js";

export class SynAckPacket extends Packet {
  static type = PacketType.SYN;
  static flags = [PacketFlag.FLAG_ACK];

  constructor(source: number, destination: number, payload: Buffer) {
    super(source, destination, SynAckPacket.type, SynAckPacket.flags, payload);
  }
}
