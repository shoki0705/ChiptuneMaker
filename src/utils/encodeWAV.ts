// src/utils/encodeWAV.ts
export function encodeWAV(buffer: AudioBuffer): ArrayBuffer {
    const numChannels = buffer.numberOfChannels;
    const sampleRate  = buffer.sampleRate;
    const bitsPerSample = 16;
    const blockAlign = numChannels * bitsPerSample / 8;
    const byteRate   = sampleRate * blockAlign;
  
    const samples = buffer.length;
    const dataSize = samples * blockAlign;
    const bufferLength = 44 + dataSize;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);
  
    let offset = 0;
    // Helper to write string
    function writeString(s: string) {
      for (let i = 0; i < s.length; i++) {
        view.setUint8(offset++, s.charCodeAt(i));
      }
    }
    // RIFF header
    writeString('RIFF');
    view.setUint32(offset, 36 + dataSize, true); offset += 4;  // file length - 8
    writeString('WAVE');
    // fmt chunk
    writeString('fmt ');
    view.setUint32(offset, 16, true); offset += 4;             // fmt chunk length
    view.setUint16(offset, 1, true);  offset += 2;             // PCM format = 1
    view.setUint16(offset, numChannels, true); offset += 2;
    view.setUint32(offset, sampleRate, true); offset += 4;
    view.setUint32(offset, byteRate, true); offset += 4;
    view.setUint16(offset, blockAlign, true); offset += 2;
    view.setUint16(offset, bitsPerSample, true); offset += 2;
    // data chunk
    writeString('data');
    view.setUint32(offset, dataSize, true); offset += 4;
  
    // write interleaved PCM samples
    const channelData: Float32Array[] = [];
    for (let ch = 0; ch < numChannels; ch++) {
      channelData.push(buffer.getChannelData(ch));
    }
    for (let i = 0; i < samples; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        // clamp & scale float [-1,1] → int16
        let sample = Math.max(-1, Math.min(1, channelData[ch][i]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, sample, true);
        offset += 2;
      }
    }
  
    return arrayBuffer;
  }
  