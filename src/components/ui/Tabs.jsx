import React from 'react';
import { theme as C } from '@/theme';

export const Tabs = ({ tabs, active, onSelect }) => (
  <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${C.border}`, marginBottom: 16 }}>
    {tabs.map(t => (
      <button key={t.label} onClick={() => onSelect(t.label)} style={{
        padding: "8px 16px", fontSize: 12,
        fontWeight: active === t.label ? 700 : 500,
        color: active === t.label ? C.primary : C.gray,
        background: "none", border: "none", cursor: "pointer",
        borderBottom: active === t.label ? `2.5px solid ${C.primary}` : "2.5px solid transparent",
        marginBottom: -2, transition: "all 0.15s", fontFamily: "inherit",
      }}>
        {t.label}
        {t.count != null && (
          <span style={{
            background: active === t.label ? C.primaryLight : C.grayLight,
            color: active === t.label ? C.primary : C.gray,
            fontSize: 10, padding: "1px 6px", borderRadius: 10, marginLeft: 4, fontWeight: 600,
          }}>{t.count}</span>
        )}
      </button>
    ))}
  </div>
);
