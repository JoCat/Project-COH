import { Packet } from "./packet.js";

export class PingPacket extends Packet {
  static incomingPayload = Buffer.from([
    32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200,
  ]);

  constructor(source: number, destination: number) {
    super(source, destination, PingPacket.incomingPayload);
  }
}
