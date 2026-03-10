import React from 'react';

export const PageHeader = ({ breadcrumb, title, children }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
    <div>
      <div style={{ fontSize: 11, color: "rgba(100,116,139,0.8)", marginBottom: 4 }}>{breadcrumb}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
    </div>
    {children && <div style={{ display: "flex", gap: 8 }}>{children}</div>}
  </div>
);
