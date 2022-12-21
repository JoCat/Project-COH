import { Packet } from "./packet.js";

export class SynPacket extends Packet {
  static type = 32;

  constructor(source: number, destination: number) {
    super(
      source,
      destination,
      SynPacket.type,
      Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200])
    );
  }
}
