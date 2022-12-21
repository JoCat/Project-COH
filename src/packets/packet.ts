export class Packet {
  source: number;
  destination: number;
  type: number;
  flags: number;
  payload: Buffer;

  constructor(
    source: number,
    destination: number,
    type: number,
    flags: number,
    payload: Buffer
  ) {
    this.source = source;
    this.destination = destination;
    this.type = type;
    this.flags = flags;
    this.payload = payload;
  }

  toBuffer() {
    let typeAndFlags = this.type;
    typeAndFlags |= this.flags << 3;

    return Buffer.from([
      this.source,
      this.destination,
      typeAndFlags,
      ...this.payload,
    ]);
  }
}
