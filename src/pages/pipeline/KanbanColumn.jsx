import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { theme as C } from '@/theme';
import { KanbanCard } from './KanbanCard';

export function KanbanColumn({ column, cards }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div style={{
      flex: 1,
      minWidth: 280,
      background: '#F1F5F9',
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 200px)',
      maxHeight: 800,
    }}>
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{column.title}</div>
          <div style={{ 
            fontSize: 10, fontWeight: 700, background: C.white, 
            padding: '2px 8px', borderRadius: 10, border: `1px solid ${C.border}`,
            color: C.gray
          }}>
            {cards.length}
          </div>
        </div>
      </div>

      <div 
        ref={setNodeRef} 
        style={{
          flex: 1,
          padding: 12,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} />
          ))}
        </SortableContext>
        
        {cards.length === 0 && (
          <div style={{ 
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: C.gray, border: `2px dashed ${C.border}`, borderRadius: 8
          }}>
            Déposer ici
          </div>
        )}
      </div>
    </div>
  );
}
