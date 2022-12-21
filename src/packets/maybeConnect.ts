import { Packet } from "./packet.js";

export class MaybeConnectPacket extends Packet {
  static type = 0;
  static flags = 1;

  constructor(source: number, destination: number, payload: Buffer) {
    super(
      source,
      destination,
      MaybeConnectPacket.type,
      MaybeConnectPacket.flags,
      payload
    );
  }
}
