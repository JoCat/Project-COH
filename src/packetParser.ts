import { Packet } from "./packets/packet.js";

export class PacketParser {
  static parse(message: Buffer) {
    return new Packet(
      message.readInt8(0),
      message.readInt8(1),
      message.readInt8(2),
      message.subarray(3, 15)
    );
  }
}
