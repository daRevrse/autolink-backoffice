import React from 'react';
import { theme as C } from '@/theme';

export const Badge = ({ children, color = C.primary, bg, icon: Icon }) => (
  <span style={{
    background: bg || `${color}18`, color, fontSize: 11, fontWeight: 600,
    padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap",
    display: "inline-flex", alignItems: "center", gap: 4,
  }}>
    {Icon && <Icon size={11} />}{children}
  </span>
);
