// src/components/FileUploader.tsx
import { Button } from '@mui/material';
export const FileUploader = ({ onFileLoaded }) => (
  <Button
    variant="contained"
    component="label"
    color="primary"
  >
    Upload Audio
    <input
      type="file"
      accept="audio/*"
      hidden
      onChange={e => e.target.files?.[0] && onFileLoaded(e.target.files[0])}
    />
  </Button>
);
