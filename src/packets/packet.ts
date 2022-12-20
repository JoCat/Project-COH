export class Packet {
  source: number;
  destination: number;
  type: number;
  payload: Buffer;

  constructor(
    source: number,
    destination: number,
    type: number,
    payload: Buffer
  ) {
    this.source = source;
    this.destination = destination;
    this.type = type;
    this.payload = payload;
  }

  toBuffer() {
    return Buffer.from([
      this.source,
      this.destination,
      this.type,
      ...this.payload,
    ]);
  }
}
