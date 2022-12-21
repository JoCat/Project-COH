import { Packet } from "./packets/packet.js";

export class PacketParser {
  static parse(message: Buffer) {
    return new Packet(
      message.readUInt8(0),
      message.readUInt8(1),
      message.readUInt8(2) & 0x7,
      message.readUInt8(2) >> 3,
      message.subarray(3, 15)
    );
  }
}
