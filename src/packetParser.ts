import { Packet } from "./packets/packet.js";

export class PacketParser {
  static parse(message: Buffer) {
    return new Packet(
      message.readInt8(0),
      message.readInt8(1),
      message.subarray(2, 15)
    );
  }
}
