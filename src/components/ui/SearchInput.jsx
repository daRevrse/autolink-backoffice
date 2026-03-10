import React from 'react';
import { Search } from "lucide-react";
import { theme as C } from '@/theme';

export const SearchInput = ({ placeholder, value, onChange, style: s }) => (
  <div style={{
    display: "flex", alignItems: "center", background: C.grayLight,
    borderRadius: 7, padding: "7px 12px", gap: 8, ...s,
  }}>
    <Search size={14} color={C.gray} />
    <input 
      value={value} 
      onChange={onChange}
      placeholder={placeholder} 
      style={{
        border: "none", background: "transparent", outline: "none",
        fontSize: 13, color: C.dark, width: "100%", fontFamily: "inherit",
      }} 
    />
  </div>
);
