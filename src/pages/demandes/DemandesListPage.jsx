import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from "lucide-react";
import { theme as C } from '@/theme';
import { 
  DataTable, Btn, PageHeader, SearchInput, StatusBadge, Spinner, Tabs, Badge 
} from '@/components/ui';
import { demandesService } from '@/services/demandes.service';
import { useDebounce } from '@/hooks/useDebounce';
import { formatDate } from '@/lib/formatters';

const TABS = [
  { label: "Toutes" },
  { label: "NOUVEAU", count: 2 },
  { label: "EN COURS", count: 1 },
  { label: "EN ATTENTE", count: 1 },
  { label: "COMPLÉTÉ", count: 1 }
];

export default function DemandesListPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Toutes");
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: demandes, isLoading } = useQuery({
    queryKey: ['demandes', tab, debouncedSearch],
    queryFn: () => demandesService.getAll()
  });

  const filteredData = demandes?.filter(d => {
    const matchesTab = tab === "Toutes" || d.status === tab;
    const matchesSearch = `${d.id} ${d.client} ${d.vehicule}`.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesTab && matchesSearch;
  }) || [];

  const columns = [
    { header: "N° Demande", key: "id" },
    { header: "Type", key: "type" },
    { 
      header: "Client", 
      render: (d) => (
        <div>
          <div style={{ fontWeight: 600 }}>{d.client}</div>
          <div style={{ fontSize: 10, color: C.gray }}>{d.vehicule}</div>
        </div>
      )
    },
    { 
      header: "Date", 
      render: (d) => formatDate(d.date) 
    },
    { 
      header: "Statut", 
      render: (d) => <StatusBadge status={d.status} /> 
    },
    { 
      header: "Priorité", 
      render: (d) => (
        <Badge color={d.priority === "URGENTE" ? C.danger : C.primary}>
          {d.priority}
        </Badge>
      )
    }
  ];

  return (
    <div>
      <PageHeader breadcrumb="Gestion" title="Demandes de Services">
        <Btn primary icon={Plus}>Nouvelle Demande</Btn>
      </PageHeader>

      <Tabs tabs={TABS} active={tab} onSelect={setTab} />

      <div style={{ 
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "16px 20px", marginBottom: 20, display: "flex", 
        justifyContent: "space-between", alignItems: "center" 
      }}>
        <SearchInput 
          placeholder="Rechercher une demande, un client..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 350 }} 
        />
        <Btn small style={{ background: C.white, border: `1px solid ${C.border}` }} icon={Filter}>
          Plus de filtres
        </Btn>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredData} 
        isLoading={isLoading}
        onRowClick={(index, d) => navigate(`/demandes/${d.id}`)}
      />
    </div>
  );
}
