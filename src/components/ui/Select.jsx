import React from 'react';
import { theme as C } from '@/theme';

export const Select = ({ label, value, onChange, options = [], children, style: s }) => (
  <div style={{ display: 'flex', flexDirection: 'column', ...s }}>
    {label && (
      <label style={{
        fontSize: 11, fontWeight: 600, color: C.gray, display: "block",
        marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.3,
      }}>{label}</label>
    )}
    <select 
      value={value}
      onChange={onChange}
      style={{
        padding: "7px 12px", borderRadius: 7, border: `1px solid ${C.border}`,
        fontSize: 12, color: C.gray, fontFamily: "inherit", background: C.white,
        cursor: 'pointer', outline: 'none',
      }}
    >
      {children ? children : options.map(opt => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
  </div>
);
