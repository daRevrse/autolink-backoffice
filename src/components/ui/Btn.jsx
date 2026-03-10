import React from 'react';
import { theme as C } from '@/theme';

export const Btn = ({ children, primary, accent, danger, outline, small, onClick, style: s, icon: Icon, type = "button", disabled, loading }) => {
  const pad = small ? "5px 10px" : "8px 16px";
  let bg = C.grayLight, color = C.dark;
  if (primary) { bg = C.primary; color = C.white; }
  if (accent)  { bg = C.accent;  color = C.white; }
  if (danger)  { bg = C.danger;  color = C.white; }
  if (outline) { bg = "transparent"; color = C.primary; }

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled || loading}
      style={{
        border: outline ? `1.5px solid ${C.primary}` : "none",
        borderRadius: 6, cursor: (disabled || loading) ? "not-allowed" : "pointer", 
        fontWeight: 600,
        fontSize: small ? 11 : 13, transition: "all 0.15s",
        display: "inline-flex", alignItems: "center", gap: 5,
        fontFamily: "inherit", background: bg, color, padding: pad,
        opacity: (disabled || loading) ? 0.6 : 1,
        ...s,
      }}
    >
      {loading ? (
        <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      ) : Icon && <Icon size={small ? 12 : 14} />}
      {children}
    </button>
  );
};
