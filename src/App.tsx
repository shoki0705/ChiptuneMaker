import React, { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ParameterSlider } from './components/ParameterSlider';
import { AudioPlayer } from './components/AudioPlayer';
import { ProgressBar } from './components/ProgressBar';
import { useAudioProcessor } from './hooks/useAudioProcessor';

const App: React.FC = () => {
  const [file,      setFile]      = useState<File | null>(null);
  const [bitDepth,  setBitDepth]  = useState(8);
  const [sampleRate, setSampleRate] = useState(8000);


  const { processedUrl, loading, progress } = useAudioProcessor(
    file, bitDepth, sampleRate
  );

  return (
    <div className="app-container">
      <h1>Chiptune Maker</h1>
      <FileUploader onFileLoaded={setFile} />

      <ParameterSlider
        label="Bit Depth" min={1} max={16}
        value={bitDepth} onChange={setBitDepth}
      />
      <ParameterSlider
        label="Sample Rate (Hz)"
        min={1000}
        max={44100}
        step={1000}
        value={sampleRate}
        onChange={setSampleRate}
      />

      {/* 進捗バー */}
      {loading && <ProgressBar progress={progress} />}

      {/* 出力済みのプレイヤー＆ダウンロード */}
      <AudioPlayer url={processedUrl} loading={loading} />
    </div>
  );
};

export default App;
