import { Packet } from "./packet.js";

export class PingPacket extends Packet {
  static type = 32;

  constructor(source: number, destination: number) {
    super(
      source,
      destination,
      PingPacket.type,
      Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200])
    );
  }
}
