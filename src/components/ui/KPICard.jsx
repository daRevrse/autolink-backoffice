import React from 'react';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { theme as C } from '@/theme';

export const KPICard = ({ label, value, sub, color = C.dark, icon: Icon }) => (
  <div style={{
    background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
    padding: "18px 20px", flex: 1, minWidth: 160,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
      {Icon && (
        <div style={{
          width: 28, height: 28, borderRadius: 7, background: `${color}14`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={14} color={color} />
        </div>
      )}
      <span style={{ fontSize: 11, color: C.gray, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
    </div>
    <div style={{ fontSize: 26, fontWeight: 700, color, lineHeight: 1.2 }}>{value}</div>
    {sub && (
      <div style={{ fontSize: 11, color: C.gray, marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
        {sub.startsWith("↑") ? <ArrowUpRight size={12} color={C.success} /> : sub.startsWith("↓") ? <ArrowDownRight size={12} color={C.danger} /> : null}
        {sub.replace(/^[↑↓]\s*/, "")}
      </div>
    )}
  </div>
);
