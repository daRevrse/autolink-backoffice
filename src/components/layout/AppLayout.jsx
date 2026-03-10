import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { theme as C } from '@/theme';

const AppLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        overflow: "auto", 
        padding: 24, 
        background: C.bg 
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
