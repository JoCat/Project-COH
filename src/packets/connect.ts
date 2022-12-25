import { Packet, PacketFlag, PacketType } from "./packet.js";

export class ConnectPacket extends Packet {
  static type = PacketType.CONNECT;
  static flags = [PacketFlag.FLAG_NEED_ACK, PacketFlag.FLAG_RELIABLE];
}
