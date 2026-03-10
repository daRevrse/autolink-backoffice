import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { theme as C } from '@/theme';
import { formatFCFA } from '@/lib/formatters';
import { User, Car, MoreVertical } from 'lucide-react';

export function KanbanCard({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: 'Card',
      card,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    background: C.white,
    padding: 16,
    borderRadius: 10,
    border: `1px solid ${C.border}`,
    marginBottom: 12,
    boxShadow: isDragging ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.05)',
    cursor: 'grab',
    position: 'relative',
    touchAction: 'none',
  };

  const priorityColor = {
    'Haut': C.danger,
    'Moyen': C.primary,
    'Bas': C.gray,
  }[card.priority] || C.primary;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ 
          fontSize: 10, fontWeight: 700, color: priorityColor, 
          background: `${priorityColor}10`, padding: '2px 8px', borderRadius: 4,
          textTransform: 'uppercase'
        }}>
          {card.priority}
        </div>
        <button style={{ background: 'none', border: 'none', color: C.gray, cursor: 'pointer', padding: 0 }}>
          <MoreVertical size={14} />
        </button>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: C.dark }}>
        {card.title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.gray }}>
          <User size={12} /> {card.client}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.gray }}>
          <Car size={12} /> Occasion
        </div>
      </div>

      <div style={{ 
        marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.primary }}>
          {formatFCFA(card.amount)}
        </div>
        <div style={{ fontSize: 10, color: C.gray }}>
          Il y a 2j
        </div>
      </div>
    </div>
  );
}
