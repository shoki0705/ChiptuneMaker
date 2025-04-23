export function bitcrush(buffer: Float32Array, bits: number): Float32Array {
    const levels = Math.pow(2, bits) - 1;
    const out = new Float32Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      out[i] = Math.round((buffer[i] + 1) / 2 * levels) / levels * 2 - 1;
    }
    return out;
  }