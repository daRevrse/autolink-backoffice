import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { theme as C } from '@/theme';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      gap: 5, marginTop: 20 
    }}>
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          border: `1px solid ${C.border}`, background: C.white,
          borderRadius: 6, padding: '6px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          color: currentPage === 1 ? C.border : C.dark, opacity: currentPage === 1 ? 0.5 : 1,
          display: 'flex', alignItems: 'center', fontSize: 12
        }}
      >
        <ChevronLeft size={14} style={{ marginRight: 4 }} /> Précédent
      </button>

      <div style={{ display: 'flex', gap: 4 }}>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                width: 32, height: 32, borderRadius: 6,
                border: `1px solid ${isActive ? C.primary : C.border}`,
                background: isActive ? C.primary : C.white,
                color: isActive ? C.white : C.dark,
                fontWeight: 600, fontSize: 12, cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          border: `1px solid ${C.border}`, background: C.white,
          borderRadius: 6, padding: '6px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          color: currentPage === totalPages ? C.border : C.dark, opacity: currentPage === totalPages ? 0.5 : 1,
          display: 'flex', alignItems: 'center', fontSize: 12
        }}
      >
        Suivant <ChevronRight size={14} style={{ marginLeft: 4 }} />
      </button>
    </div>
  );
};
