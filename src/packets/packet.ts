export class Packet {
  source: number;
  destination: number;
  type: PacketType;
  flags: PacketFlag[];
  payload: Buffer;

  constructor(
    source: number,
    destination: number,
    type: PacketType,
    flags: PacketFlag[],
    payload: Buffer
  ) {
    this.source = source;
    this.destination = destination;
    this.type = type;
    this.flags = flags;
    this.payload = payload;
  }

  includesFlags(flags: PacketFlag[]) {
    return this.flags.every((flag) => flags.includes(flag));
  }

  toBuffer() {
    return Buffer.from([
      this.source,
      this.destination,
      this.#getByteFromTypeAndFlags(),
      ...this.payload,
    ]);
  }

  #getByteFromTypeAndFlags() {
    let typeAndFlags = this.type;

    const flagsSum = this.flags.reduce((prev, cur) => prev + cur, 0);

    return typeAndFlags | (flagsSum << 3);
  }

  static #getTypeAndFlagsFromByte(byte: number) {
    const type = byte & 0x7; // 00000111 mask

    const rawFlags = byte >> 3;
    const flags = this.#parseFlags(rawFlags);

    return { type, flags };
  }

  static #parseFlags(byte: number) {
    const flags: PacketFlag[] = [];

    if (byte & PacketFlag.FLAG_ACK) {
      flags.push(PacketFlag.FLAG_ACK);
    }

    if (byte & PacketFlag.FLAG_RELIABLE) {
      flags.push(PacketFlag.FLAG_RELIABLE);
    }

    if (byte & PacketFlag.FLAG_NEED_ACK) {
      flags.push(PacketFlag.FLAG_NEED_ACK);
    }

    if (byte & PacketFlag.FLAG_HAS_SIZE) {
      flags.push(PacketFlag.FLAG_HAS_SIZE);
    }

    if (byte & PacketFlag.FLAG_UNKNOWN) {
      flags.push(PacketFlag.FLAG_UNKNOWN);
    }

    return flags;
  }

  static fromRawPacket(message: Buffer) {
    const source = message.readUInt8(0);
    const destination = message.readUInt8(1);
    const { type, flags } = this.#getTypeAndFlagsFromByte(message.readUInt8(2));
    const payload = message.subarray(3, 15);

    return new Packet(source, destination, type, flags, payload);
  }
}

export enum PacketType {
  SYN,
  CONNECT,
  DATA,
  DISCONNECT,
  PING,
  NATPING,
}

export enum PacketFlag {
  FLAG_ACK = 1,
  FLAG_RELIABLE = 2,
  FLAG_NEED_ACK = 4,
  FLAG_HAS_SIZE = 8,
  FLAG_UNKNOWN = 16,
}
