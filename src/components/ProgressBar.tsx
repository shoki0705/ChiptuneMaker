import React from 'react';

type Props = {
  progress: number;  // 0〜100
};

export const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <div style={{
      width: '100%',
      background: '#eee',
      borderRadius: 4,
      overflow: 'hidden',
      height: '8px',
      margin: '8px 0'
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: '#3498db',
        transition: 'width 0.1s ease-out'
      }} />
    </div>
  );
};
