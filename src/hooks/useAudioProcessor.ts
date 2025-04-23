// src/hooks/useAudioProcessor.ts
import { useEffect, useState } from 'react';
import { encodeWAV } from '../utils/encodeWAV';

export function useAudioProcessor(
  file: File | null,
  bitDepth: number,
  targetRate: number  // 単位: Hz
) {
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);
  const [progress, setProgress]       = useState(0);

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    setProgress(0);

    (async () => {
      // 1) 読み込み＆デコード
      const arrayBuffer = await file.arrayBuffer();
      const decodeCtx   = new AudioContext();
      const decoded     = await decodeCtx.decodeAudioData(arrayBuffer);
      decodeCtx.close();

      const nch        = decoded.numberOfChannels;
      const len        = decoded.length;
      const sr         = decoded.sampleRate;             // 元レート
      const levels     = Math.pow(2, bitDepth) - 1;
      const holdInterval = Math.max(1, Math.floor(sr / targetRate));

      // 2) 出力用バッファ準備
      const outBuf = new AudioBuffer({
        length: len,
        numberOfChannels: nch,
        sampleRate: sr
      });

      // 3) sample‑and‑hold + bit‑crush
      for (let ch = 0; ch < nch; ch++) {
        const inData  = decoded.getChannelData(ch);
        const outData = outBuf.getChannelData(ch);
        let heldValue = 0;
        for (let i = 0; i < len; i++) {
          if (i % holdInterval === 0) {
            // 量子化
            const v = inData[i];
            heldValue = Math.round((v + 1) / 2 * levels) / levels * 2 - 1;
          }
          outData[i] = heldValue;

          // 進捗更新（適宜）
          if (i % 20000 === 0) {
            const overall = ((ch * len + i) / (nch * len)) * 100;
            setProgress(Math.round(overall));
            await new Promise(res => setTimeout(res, 0));
          }
        }
      }

      // 4) WAV に変換して URL 化
      const wavBuf = encodeWAV(outBuf);
      const blob   = new Blob([wavBuf], { type: 'audio/wav' });
      setProcessedUrl(URL.createObjectURL(blob));
      setProgress(100);
      setLoading(false);
    })();
  }, [file, bitDepth, targetRate]);

  return { processedUrl, loading, progress };
}
