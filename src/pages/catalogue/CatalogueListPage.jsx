import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search, Tag, Info } from "lucide-react";
import { theme as C } from '@/theme';
import { 
  Btn, PageHeader, SearchInput, Badge, Spinner, DataTable 
} from '@/components/ui';
import { catalogueService } from '@/services/catalogue.service';
import { useDebounce } from '@/hooks/useDebounce';
import { formatFCFA } from '@/lib/formatters';

export default function CatalogueListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: items, isLoading } = useQuery({
    queryKey: ['catalogue', debouncedSearch],
    queryFn: () => catalogueService.getAll()
  });

  const filteredItems = items?.filter(i => 
    `${i.marque} ${i.modele}`.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || [];

  const columns = [
    { 
      header: "Véhicule", 
      render: (i) => (
        <div style={{ display: "flex", gap: 12, alignItems: 'center' }}>
          <div style={{ 
            width: 60, height: 40, background: '#F1F5F9', borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Tag size={18} color={C.gray} />
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{i.marque} {i.modele}</div>
            <div style={{ fontSize: 11, color: C.gray }}>{i.annee} • {i.carburant}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Prix", 
      render: (i) => <span style={{ fontWeight: 700, color: C.primary }}>{formatFCFA(i.prix)}</span>
    },
    { 
      header: "État", 
      render: (i) => (
        <Badge color={i.etat === "Neuf" ? C.primary : C.accent}>
          {i.etat}
        </Badge>
      )
    },
    { header: "Transmission", key: "transmission" },
    {
      header: "Actions",
      render: (i) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Btn 
            small 
            style={{ background: C.white, border: `1px solid ${C.border}` }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/catalogue/${i.id}/edit`);
            }}
          >
            Modifier
          </Btn>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader breadcrumb="Vente" title="Catalogue de vente">
        <Btn primary icon={Plus} onClick={() => navigate('/catalogue/new')}>
          Publier une annonce
        </Btn>
      </PageHeader>

      <div style={{ 
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "16px 20px", marginBottom: 20, display: "flex", 
        justifyContent: "space-between", alignItems: "center" 
      }}>
        <SearchInput 
          placeholder="Rechercher une annonce..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 350 }} 
        />
        <Btn small style={{ background: C.white, border: `1px solid ${C.border}` }} icon={Filter}>
          Filtres
        </Btn>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredItems} 
        isLoading={isLoading}
        onRowClick={(index, i) => console.log('View item', i)}
      />
    </div>
  );
}
