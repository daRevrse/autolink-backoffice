import React from 'react';
import { theme as C } from '@/theme';

export const Spinner = ({ size = 24, color = C.primary, thickness = 2 }) => (
  <div style={{
    width: size,
    height: size,
    border: `${thickness}px solid ${color}20`,
    borderTop: `${thickness}px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  }} />
);
