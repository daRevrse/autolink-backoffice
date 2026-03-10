import React from 'react';
import { theme as C } from '@/theme';

export const FormField = ({ label, value, defaultValue, placeholder, type, name, register, error, options = [], ...props }) => {
  const inputStyles = {
    width: "100%", padding: "8px 10px", borderRadius: 6,
    border: `1px solid ${error ? C.danger : C.border}`, fontSize: 13,
    color: (value || defaultValue) ? C.dark : C.gray, background: C.white,
    boxSizing: "border-box", fontFamily: "inherit", outline: 'none',
    transition: 'border-color 0.15s',
  };

  const registerProps = register ? register(name) : {};

  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{
          fontSize: 11, fontWeight: 600, color: C.gray, display: "block",
          marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.3,
        }}>{label}</label>
      )}
      
      {type === "select" ? (
        <select 
          {...registerProps}
          {...props}
          style={inputStyles}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          {...registerProps}
          {...props}
          placeholder={placeholder}
          style={{ ...inputStyles, minHeight: 80, resize: 'vertical' }}
        />
      ) : (
        <input 
          type={type || "text"}
          {...registerProps}
          {...props}
          placeholder={placeholder} 
          style={inputStyles} 
        />
      )}
      
      {error && (
        <div style={{ fontSize: 10, color: C.danger, marginTop: 4, fontWeight: 500 }}>
          {error.message || error}
        </div>
      )}
    </div>
  );
};
