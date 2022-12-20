import { Packet } from "./packet.js";

export class MaybeConnectPacket extends Packet {
  static type = 8;

  constructor(source: number, destination: number) {
    super(
      source,
      destination,
      MaybeConnectPacket.type,
      Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    );
  }
}
