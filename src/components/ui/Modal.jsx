import React, { useEffect } from 'react';
import { X } from "lucide-react";
import { theme as C } from '@/theme';

export const Modal = ({ isOpen, onClose, title, children, footer, width = 500 }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20
    }} onClick={onClose}>
      <div 
        style={{
          background: C.white, borderRadius: 12, width, maxWidth: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
          maxHeight: '90vh'
        }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ 
          padding: '16px 20px', borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ 
            background: 'none', border: 'none', cursor: 'pointer', color: C.gray,
            padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', transition: 'background 0.2s'
          }} onMouseEnter={e => e.currentTarget.style.background = C.grayLight} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{ 
            padding: '14px 20px', borderTop: `1px solid ${C.border}`,
            background: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: 10
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
