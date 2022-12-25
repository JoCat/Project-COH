import { Packet, PacketFlag, PacketType } from "./packet.js";

export class ConnectPacket extends Packet {
  static type = PacketType.CONNECT;
  static flags = [PacketFlag.FLAG_NEED_ACK, PacketFlag.FLAG_RELIABLE];

  constructor(source: number, destination: number, payload: Buffer) {
    const ses = payload.readUInt8(0);
    const sig = payload.readUInt32LE(1);
    const seq = payload.readUInt16LE(5);
    const csi = payload.readUInt32LE(8);
    const cks = payload.readUInt8(11);

    super(
      source,
      destination,
      ConnectPacket.type,
      ConnectPacket.flags,
      Buffer.from([ses, csi, seq, sig, cks])
    );
  }
}
