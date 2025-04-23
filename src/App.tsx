// src/App.tsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FileUploader } from './components/FileUploader';
import { ParameterSlider } from './components/ParameterSlider';
import { AudioPlayer } from './components/AudioPlayer';
import { ProgressBar } from './components/ProgressBar';
import { useAudioProcessor } from './hooks/useAudioProcessor';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bitDepth, setBitDepth] = useState(8);
  const [sampleRate, setSampleRate] = useState(8000);

  const { processedUrl, loading, progress } = useAudioProcessor(
    file,
    bitDepth,
    sampleRate
  );

  return (
    <Box
      className="app-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  // ← 中央揃え
        px: 2,
        py: 4,
        gap: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Chiptune Maker
      </Typography>

      <FileUploader onFileLoaded={setFile} />

      <ParameterSlider
        label="Bit Depth"
        min={1}
        max={16}
        value={bitDepth}
        onChange={setBitDepth}
      />

      <ParameterSlider
        label="Sample Rate (Hz)"
        min={1000}
        max={44100}
        step={1000}
        value={sampleRate}
        onChange={setSampleRate}
      />

      {loading && <ProgressBar progress={progress} />}

      <AudioPlayer url={processedUrl} loading={loading} />
    </Box>
  );
};

export default App;
