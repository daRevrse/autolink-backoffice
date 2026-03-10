import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  PointerSensor, 
  useSensor, 
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Filter, Search, MoreHorizontal } from "lucide-react";
import { theme as C } from '@/theme';
import { Btn, PageHeader, Spinner, SearchInput } from '@/components/ui';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { pipelineService, COLUMNS } from '@/services/pipeline.service';
import { toast } from 'react-hot-toast';

export default function KanbanPage() {
  const queryClient = useQueryClient();
  const [activeCard, setActiveCard] = useState(null);

  const { data: cards, isLoading } = useQuery({
    queryKey: ['pipeline'],
    queryFn: () => pipelineService.getAll()
  });

  const mutation = useMutation({
    mutationFn: ({ cardId, targetColumnId }) => pipelineService.moveCard(cardId, targetColumnId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipeline'] });
    },
    onError: () => {
      toast.error("Échec du déplacement");
    }
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart(event) {
    const { active } = event;
    setActiveCard(cards.find(c => c.id === active.id));
  }

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Logic for cross-column items can be added here if using sortable between columns
    // For simplicity, we'll handle the drop in onDragEnd
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const cardId = active.id;
    const overId = over.id;

    // Find if over is a column or a card
    const isColumn = COLUMNS.some(col => col.id === overId);
    let targetColumnId = overId;

    if (!isColumn) {
      const overCard = cards.find(c => c.id === overId);
      if (overCard) targetColumnId = overCard.columnId;
    }

    const activeCardObj = cards.find(c => c.id === cardId);
    if (activeCardObj.columnId !== targetColumnId) {
      mutation.mutate({ cardId, targetColumnId });
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader breadcrumb="Pipeline" title="Pipeline de Vente">
        <Btn primary icon={Plus}>Opportunité</Btn>
      </PageHeader>

      <div style={{ 
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "16px 20px", marginBottom: 20, display: "flex", 
        justifyContent: "space-between", alignItems: "center" 
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <SearchInput placeholder="Rechercher une opportunité..." style={{ width: 300 }} />
          <Btn small style={{ background: C.white, border: `1px solid ${C.border}` }} icon={Filter}>
            Filtres
          </Btn>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.gray }}>
          Total Pipeline : <span style={{ color: C.primary }}>84.5M FCFA</span>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div style={{ 
          display: 'flex', 
          gap: 20, 
          overflowX: 'auto', 
          paddingBottom: 20,
          flex: 1
        }}>
          {COLUMNS.map((col) => (
            <KanbanColumn 
              key={col.id} 
              column={col} 
              cards={cards?.filter(c => c.columnId === col.id) || []} 
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? <KanbanCard card={activeCard} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
