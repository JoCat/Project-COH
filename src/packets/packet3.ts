import { Packet } from "./packet.js";

export class Packet3 extends Packet {
  static type = 49;

  constructor(source: number, destination: number, payload: Buffer) {
    const ses = payload.readUInt8(0);
    const sig = payload.readUInt32LE(1);
    const seq = payload.readUInt16LE(5);
    const csi = payload.readUInt32LE(8);
    const cks = payload.readUInt8(11);

    super(
      source,
      destination,
      Packet3.type,
      Buffer.from([ses, csi, seq, sig, cks])
    );
  }
}
