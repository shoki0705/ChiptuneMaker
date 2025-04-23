export function sampleRateReducer(
    buffer: Float32Array,
    factor: number
  ): Float32Array {
    const length = Math.floor(buffer.length * factor);
    const out = new Float32Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      out[i] = buffer[Math.floor(i * factor)];
    }
    return out;
  }