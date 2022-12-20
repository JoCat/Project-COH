export class Packet {
  source: number;
  destination: number;
  payload: Buffer;

  constructor(source: number, destination: number, payload: Buffer) {
    this.source = source;
    this.destination = destination;
    this.payload = payload;
  }

  toBuffer() {
    return Buffer.from([this.source, this.destination, ...this.payload]);
  }
}
