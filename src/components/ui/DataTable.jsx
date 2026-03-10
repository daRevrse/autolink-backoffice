import React from 'react';
import { theme as C } from '@/theme';
import { Spinner } from './Spinner';

export const DataTable = ({ headers, rows, data, columns, onRowClick, isLoading, emptyMessage = "Aucune donnée à afficher" }) => {
  // Support for new data/columns pattern or old headers/rows pattern
  const tableHeaders = columns ? columns.map(c => c.header) : headers;
  const tableRows = data ? data.map(item => columns.map(col => col.render ? col.render(item) : item[col.key])) : rows;

  return (
    <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${C.border}`, position: 'relative', minHeight: isLoading ? 120 : 'auto' }}>
      {isLoading && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 10
        }}>
          <Spinner />
        </div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            {tableHeaders.map((h, i) => (
              <th key={i} style={{
                background: "#F1F5F9", padding: "10px 12px", textAlign: "left",
                fontWeight: 600, color: C.dark, borderBottom: `1px solid ${C.border}`,
                whiteSpace: "nowrap", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.3,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!isLoading && tableRows.length === 0 && (
            <tr>
              <td colSpan={tableHeaders.length} style={{ padding: '40px 20px', textAlign: 'center', color: C.gray }}>
                {emptyMessage}
              </td>
            </tr>
          )}
          {tableRows.map((row, ri) => (
            <tr key={ri}
              onClick={() => onRowClick?.(ri, data ? data[ri] : row)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "10px 12px", borderBottom: `1px solid ${C.border}`,
                  color: C.dark, whiteSpace: "nowrap",
                }}>
                  {typeof cell === "object" && cell?.type ? cell : <span>{cell}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
