import React from 'react';
import { Outlet } from 'react-router-dom';
import { theme as C } from '@/theme';

const AuthLayout = () => {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: `linear-gradient(135deg, ${C.darkSidebar} 0%, #0c1221 100%)`,
      padding: 20
    }}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
