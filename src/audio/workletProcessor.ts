class ChiptuneProcessor extends AudioWorkletProcessor {
    static get parameterDescriptors() {
      return [
        { name: 'bitDepth', defaultValue: 8, minValue: 1, maxValue: 16 },
        { name: 'reduction', defaultValue: 1.0, minValue: 0.1, maxValue: 1.0 }
      ];
    }
    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>) {
      const input = inputs[0];
      const output = outputs[0];
      const bits = parameters.bitDepth[0];
      const factor = parameters.reduction[0];
      const levels = Math.pow(2, bits) - 1;
      for (let ch = 0; ch < input.length; ch++) {
        const inCh = input[ch];
        const outCh = output[ch];
        for (let i = 0; i < inCh.length; i++) {
          const sample = inCh[i];
          const crushed = Math.round((sample + 1) / 2 * levels) / levels * 2 - 1;
          outCh[i] = crushed;
        }
      }
      return true;
    }
  }
  
  registerProcessor('chiptune-processor', ChiptuneProcessor);