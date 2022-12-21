import { Packet } from "./packet.js";

export class MaybeConnectPacket extends Packet {
  static type = 8;

  constructor(source: number, destination: number, payload: Buffer) {
    super(source, destination, MaybeConnectPacket.type, payload);
  }
}
