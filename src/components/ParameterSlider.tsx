// src/components/ParameterSlider.tsx
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Slider,
  TextField,
  useTheme,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
};

export const ParameterSlider: React.FC<Props> = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  const theme = useTheme();

  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {/* ラベル＋数値入力 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <TextField
          size="small"
          type="number"
          value={value}
          inputProps={{ min, max, step }}
          onChange={e => onChange(Number(e.target.value))}
          sx={{ width: 80 }}
        />
      </Box>

      {/* コントロール（− ボタン, スライダー, + ボタン） */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={decrement}
          disabled={value <= min}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            mr: 1,
          }}
          size="small"
        >
          <RemoveIcon fontSize="small" />
        </IconButton>

        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(_, v) => onChange(v as number)}
          sx={{
            flex: 1,
            mx: 1,
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16,
              bgcolor: theme.palette.primary.main,
            },
            '& .MuiSlider-track': {
              bgcolor: theme.palette.primary.main,
            },
          }}
        />

        <IconButton
          onClick={increment}
          disabled={value >= max}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            ml: 1,
          }}
          size="small"
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
