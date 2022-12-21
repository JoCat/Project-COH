import { Packet } from "./packets/packet.js";

export class PacketParser {
  static parse(message: Buffer) {
    return new Packet(
      message.readUInt8(0),
      message.readUInt8(1),
      message.readUInt8(2),
      message.subarray(3, 15)
    );
  }
}
