import { FreeDPoll, FreeDPosition } from './types';
import { checksum, positionToFreeDUnits, rotationToFreeDUnits } from './utils';

function positionMessageToBytes(message: FreeDPosition): Uint8Array {
  const bytes = new Uint8Array(29);

  bytes[0] = 0xd1;
  bytes[1] = message.id;

  bytes.set(rotationToFreeDUnits(message.pan), 2);
  bytes.set(rotationToFreeDUnits(message.tilt), 5);
  bytes.set(rotationToFreeDUnits(message.roll), 8);

  bytes.set(positionToFreeDUnits(message.posX), 11);
  bytes.set(positionToFreeDUnits(message.posY), 14);
  bytes.set(positionToFreeDUnits(message.posZ), 17);

  bytes[20] = message.zoom >> 12;
  bytes[21] = message.zoom >> 8;
  bytes[22] = message.zoom % 256;

  bytes[23] = message.focus >> 12;
  bytes[24] = message.focus >> 8;
  bytes[25] = message.focus % 256;


  bytes[28] = checksum(bytes.subarray(0, 28));
  return bytes;
}
export function encode(message: FreeDPosition): Uint8Array {
  switch (message.type) {
    case 0xd1:
      return positionMessageToBytes(message);
    default:
      throw new Error('unsupport freeD message type');
  }
}
