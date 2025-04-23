// src/components/AudioPlayer.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { downloadBlob } from '../utils/downloadBlob';

type Props = {
  url: string | null;      // URL.createObjectURL で生成した音声データの URL
  loading: boolean;
};

export const AudioPlayer: React.FC<Props> = ({ url, loading }) => {
  const theme = useTheme();
  const [filename, setFilename] = useState('sample.wav');

  return (
    <Box
      sx={{
        p: 2,
        mt: 2,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {!url && !loading && (
        <Typography variant="body2" color="text.secondary" align="center">
          No audio loaded.
        </Typography>
      )}
      {loading && (
        <Typography variant="body2" color="text.secondary" align="center">
          Processing...
        </Typography>
      )}
      {url && !loading && (
        <Typography variant="body2" color="text.secondary" align="center">
          Play the audio and download it as a file.
        </Typography>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AudiotrackIcon color="primary" fontSize="large" />
        <audio
          controls
          src={url ?? undefined}
          style={{ width: '100%', outline: 'none' }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          size="small"
          label="Save as"
          value={filename}
          onChange={e => setFilename(e.target.value)}
          variant="outlined"
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="secondary"
          endIcon={<DownloadIcon />}
          disabled={!url}
          onClick={() => url && downloadBlob(url, filename)}
        >
          Download
        </Button>
      </Box>


    </Box>
  );
};
