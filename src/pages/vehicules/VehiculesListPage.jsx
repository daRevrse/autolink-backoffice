import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Car, Filter, Plus, Search } from "lucide-react";
import { theme as C } from '@/theme';
import { 
  DataTable, Btn, PageHeader, SearchInput, StatusBadge, Spinner 
} from '@/components/ui';
import { vehiculesService } from '@/services/vehicules.service';
import { useDebounce } from '@/hooks/useDebounce';

export default function VehiculesListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: vehicules, isLoading } = useQuery({
    queryKey: ['vehicules', debouncedSearch],
    queryFn: () => vehiculesService.getAll()
  });

  const filteredVehicules = vehicules?.filter(v => 
    `${v.immatriculation} ${v.marque} ${v.modele} ${v.proprietaire}`.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || [];

  const columns = [
    { 
      header: "Véhicule", 
      render: (v) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ 
            width: 36, height: 36, borderRadius: 8, background: '#F1F5F9',
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Car size={18} color={C.gray} />
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{v.immatriculation}</div>
            <div style={{ fontSize: 11, color: C.gray }}>{v.marque} {v.modele} ({v.annee})</div>
          </div>
        </div>
      )
    },
    { header: "Propriétaire", key: "proprietaire" },
    { 
      header: "Kilométrage", 
      render: (v) => <span style={{ fontWeight: 600 }}>{v.km.toLocaleString()} km</span>
    },
    { 
      header: "Statut", 
      render: (v) => <StatusBadge status={v.status} /> 
    },
    { 
      header: "Prochain Entretien", 
      render: (v) => (
        <span style={{ color: v.nextService === "En retard" ? C.danger : C.dark, fontWeight: v.nextService === "En retard" ? 700 : 400 }}>
          {v.nextService}
        </span>
      )
    },
    {
      header: "Actions",
      render: (v) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Btn 
            small 
            style={{ background: C.white, border: `1px solid ${C.border}` }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/vehicules/${v.id}/edit`);
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
      <PageHeader breadcrumb="Gestion" title="Parc Automobile">
        <Btn primary icon={Plus} onClick={() => navigate('/vehicules/new')}>
          Nouveau Véhicule
        </Btn>
      </PageHeader>

      <div style={{ 
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "16px 20px", marginBottom: 20, display: "flex", 
        justifyContent: "space-between", alignItems: "center" 
      }}>
        <SearchInput 
          placeholder="Rechercher par plaque, marque, propriétaire..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 400 }} 
        />
        <Btn small style={{ background: C.white, border: `1px solid ${C.border}` }} icon={Filter}>
          Filtres avancés
        </Btn>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredVehicules} 
        isLoading={isLoading}
        onRowClick={(index, v) => navigate(`/vehicules/${v.id}`)}
      />
    </div>
  );
}
