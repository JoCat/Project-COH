import { Packet } from "./packet.js";

export class SynPacket extends Packet {
  static type = 0;
  static flags = 4;

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
