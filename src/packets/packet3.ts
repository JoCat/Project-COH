import { Packet } from "./packet.js";

export class Packet3 extends Packet {
  static type = 49;

  constructor(source: number, destination: number, payload: Buffer) {
    super(source, destination, Packet3.type, payload);
  }
}
