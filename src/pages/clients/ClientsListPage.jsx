import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Filter, Mail, Phone, MapPin } from "lucide-react";
import { theme as C } from '@/theme';
import { 
  DataTable, Btn, PageHeader, SearchInput, Badge, Spinner 
} from '@/components/ui';
import { clientsService } from '@/services/clients.service';
import { useDebounce } from '@/hooks/useDebounce';
import { formatFCFA } from '@/lib/formatters';

export default function ClientsListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients', debouncedSearch],
    queryFn: () => clientsService.getAll()
  });

  const filteredClients = clients?.filter(c => 
    `${c.name} ${c.email} ${c.city}`.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || [];

  const columns = [
    { 
      header: "Client", 
      render: (c) => (
        <div>
          <div style={{ fontWeight: 600 }}>{c.name}</div>
          <div style={{ fontSize: 10, color: C.gray, display: "flex", alignItems: "center", gap: 4 }}>
            <Mail size={10} /> {c.email}
          </div>
        </div>
      )
    },
    { 
      header: "Contact", 
      render: (c) => (
        <div style={{ fontSize: 11 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Phone size={10} color={C.gray} /> {c.phone}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: C.gray }}>
            <MapPin size={10} /> {c.city}
          </div>
        </div>
      )
    },
    { 
      header: "Véhicules", 
      render: (c) => <Badge color={C.primary}>{c.vehicles} véhicule(s)</Badge>
    },
    { 
      header: "Total Dépensé", 
      render: (c) => <span style={{ fontWeight: 600 }}>{formatFCFA(c.totalSpent)}</span>
    },
    { 
      header: "Segment", 
      render: (c) => (
        <Badge color={c.segment === "VIP" ? C.accent : C.primary} bg={c.segment === "VIP" ? "#FFF7ED" : undefined}>
          {c.segment}
        </Badge>
      )
    },
    {
      header: "Dernier Service",
      key: "lastService"
    }
  ];

  return (
    <div>
      <PageHeader breadcrumb="Gestion" title="Fichier Clients">
        <Btn primary icon={UserPlus}>Nouveau Client</Btn>
      </PageHeader>

      <div style={{ 
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "16px 20px", marginBottom: 20, display: "flex", 
        justifyContent: "space-between", alignItems: "center" 
      }}>
        <SearchInput 
          placeholder="Rechercher un client (nom, ville, email...)" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 400 }} 
        />
        <div style={{ display: "flex", gap: 10 }}>
          <Btn small style={{ background: C.white, border: `1px solid ${C.border}` }} icon={Filter}>
            Tous les segments
          </Btn>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredClients} 
        isLoading={isLoading}
        onRowClick={(index, client) => navigate(`/clients/${client.id}`)}
      />
    </div>
  );
}
