export function toFloat64Array (buffer: Buffer): Float64Array {
  const ab = new ArrayBuffer(buffer.byteLength);
  const array = new Float64Array(ab);

  for (let i = 0; i < buffer.byteLength; i += 8) {
    array[i / 8] = buffer.readDoubleLE(i);
  }

  return array;
}