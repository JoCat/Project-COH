// More info https://github.com/zeroKilo/GROBackendWV/wiki/QPacket-Format
export class Packet {
  source: number;
  destination: number;
  type: PacketType;
  flags: PacketFlag[];
  sessionId: number;
  signature: number;
  sequenceId: number;
  connectionSignature: number;
  partNumber: number;
  payloadSize: number;
  payload: Buffer;
  checksum: number;
  _offset: number;

  constructor(
    source: number,
    destination: number,
    type: PacketType,
    flags: PacketFlag[],
    sessionId: number,
    signature: number,
    sequenceId: number,
    connectionSignature: number,
    partNumber: number,
    payloadSize: number,
    payload: Buffer,
    checksum: number,
    _offset: number
  ) {
    this.source = source;
    this.destination = destination;
    this.type = type;
    this.flags = flags;
    this.sessionId = sessionId;
    this.signature = signature;
    this.sequenceId = sequenceId;
    this.connectionSignature = connectionSignature;
    this.partNumber = partNumber;
    this.payloadSize = payloadSize;
    this.payload = payload;
    this.checksum = checksum;
    this._offset = _offset;
  }

  includesFlags(flags: PacketFlag[]) {
    return this.flags.every((flag) => flags.includes(flag));
  }

  toBuffer() {
    let offset = 0;
    const message = Buffer.alloc(this._offset);

    offset = message.writeUInt8(this.source, offset);
    offset = message.writeUInt8(this.destination, offset);
    offset = message.writeUInt8(this.#getByteFromTypeAndFlags(), offset);
    offset = message.writeUInt8(this.sessionId, offset);
    offset = message.writeUInt32LE(this.signature, offset);
    offset = message.writeUInt16LE(this.sequenceId, offset);

    if (this.type == PacketType.SYN || this.type == PacketType.CONNECT) {
      offset = message.writeUInt32LE(this.connectionSignature, offset);
    }

    if (this.type == PacketType.DATA) {
      offset = message.writeUInt8(this.partNumber, offset);
    }

    if (this.flags.includes(PacketFlag.FLAG_HAS_SIZE)) {
      offset = message.writeUInt16LE(this.payloadSize, offset);
    }

    this.payload.forEach((value) => {
      offset = message.writeUInt8(value, offset);
    });

    message.writeUInt8(this.checksum, offset);

    return message;
  }

  #getByteFromTypeAndFlags() {
    let typeAndFlags = this.type;

    for (const flag of this.flags) {
      typeAndFlags |= flag << 3;
    }

    return typeAndFlags;
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
    let offset = 0;

    const source = message.readUInt8(offset++);
    const destination = message.readUInt8(offset++);
    const { type, flags } = this.#getTypeAndFlagsFromByte(
      message.readUInt8(offset++)
    );
    const sessionId = message.readUInt8(offset++);
    const signature = message.readUInt32LE(offset);
    offset += 4;
    const sequenceId = message.readUInt16LE(offset);
    offset += 2;

    let connectionSignature = 0;
    let partNumber = 0;
    let payloadSize;

    if (type == PacketType.SYN || type == PacketType.CONNECT) {
      connectionSignature = message.readUInt32LE(offset);
      offset += 4;
    }

    if (type == PacketType.DATA) {
      partNumber = message.readUInt8(offset++);
    }

    if (flags.includes(PacketFlag.FLAG_HAS_SIZE)) {
      payloadSize = message.readUInt16LE(offset);
      offset += 2;
    } else {
      payloadSize = message.length - offset - 1;
    }

    let payload = Buffer.alloc(0);
    if (payloadSize != 0) {
      payload = message.subarray(offset, payloadSize);
    }

    offset += payloadSize;
    const checksum = message.readUInt8(offset++);

    return new Packet(
      source,
      destination,
      type,
      flags,
      sessionId,
      signature,
      sequenceId,
      connectionSignature,
      partNumber,
      payloadSize,
      payload,
      checksum,
      offset
    );
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
