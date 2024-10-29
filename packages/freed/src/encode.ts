import { FreeDPosition } from './types';
import { checksum, positionToFreeDUnits, rotationToFreeDUnits } from './utils';

export function encode(message: FreeDPosition): Uint8Array {
  switch (message.type) {
    case 0xd1:
      const view = new Uint8Array(29);

      view[0] = 0xd1;
      view[1] = message.id;

      view.set(rotationToFreeDUnits(message.pan), 2);
      view.set(rotationToFreeDUnits(message.tilt), 5);
      view.set(rotationToFreeDUnits(message.roll), 8);

      view.set(positionToFreeDUnits(message.posX), 11);
      view.set(positionToFreeDUnits(message.posY), 14);
      view.set(positionToFreeDUnits(message.posZ), 17);

      view[20] = message.zoom >> 12;
      view[21] = message.zoom >> 8;
      view[22] = message.zoom % 256;

      view[23] = message.focus >> 12;
      view[24] = message.focus >> 8;
      view[25] = message.focus % 256;

      view[28] = checksum(new Uint8Array(view.buffer, 0, 28));
      return view;

    default:
      throw new Error('unsupport freeD message type');
  }
}
