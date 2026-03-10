import React from 'react';
import { theme as C } from '@/theme';

export const EmptyState = ({ icon: Icon, title, message, children }) => (
  <div style={{
    padding: '60px 20px', textAlign: 'center', display: 'flex',
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
  }}>
    {Icon && (
      <div style={{ 
        width: 64, height: 64, borderRadius: '50%', background: C.grayLight,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16, color: C.gray
      }}>
        <Icon size={32} />
      </div>
    )}
    <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 700 }}>{title}</h3>
    <p style={{ margin: '0 0 24px 0', color: C.gray, fontSize: 14, maxWidth: 300, lineHeight: 1.5 }}>
      {message}
    </p>
    {children}
  </div>
);
