import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, UserPlus, Filter } from "lucide-react";
import { theme as C } from '@/theme';
import { 
  DataTable, Btn, PageHeader, SearchInput, StatusBadge, Spinner 
} from '@/components/ui';
import { usersService } from '@/services/users.service';
import { useDebounce } from '@/hooks/useDebounce';
import { formatDateTime } from '@/lib/formatters';

export default function UsersListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: users, isLoading } = useQuery({
    queryKey: ['users', debouncedSearch],
    queryFn: () => usersService.getAll() // In real app, pass search term to API
  });

  // Filter localement pour le mock
  const filteredUsers = users?.filter(u => 
    `${u.nom} ${u.prenom} ${u.email}`.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || [];

  const columns = [
    { 
      header: "Utilisateur", 
      render: (u) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ 
            width: 32, height: 32, borderRadius: "50%", background: C.grayLight,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: C.gray
          }}>
            {u.prenom[0]}{u.nom[0]}
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{u.prenom} {u.nom}</div>
            <div style={{ fontSize: 10, color: C.gray }}>{u.email}</div>
          </div>
        </div>
      )
    },
    { header: "Rôle", key: "role" },
    { 
      header: "Statut", 
      render: (u) => <StatusBadge status={u.status} /> 
    },
    { 
      header: "Dernière connexion", 
      render: (u) => formatDateTime(u.lastLogin)
    },
    {
      header: "Actions",
      render: (u) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Btn 
            small 
            style={{ background: C.white, border: `1px solid ${C.border}` }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/users/${u.id}/edit`);
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
      <PageHeader breadcrumb="Utilisateurs" title="Gestion des Utilisateurs">
        <Btn primary icon={UserPlus} onClick={() => navigate('/users/new')}>
          Ajouter un Utilisateur
        </Btn>
      </PageHeader>

      <div style={{ 
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "16px 20px", marginBottom: 20, display: "flex", 
        justifyContent: "space-between", alignItems: "center" 
      }}>
        <SearchInput 
          placeholder="Rechercher un utilisateur (nom, email...)" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 350 }} 
        />
        <div style={{ display: "flex", gap: 10 }}>
          <Btn small style={{ background: C.white, border: `1px solid ${C.border}` }} icon={Filter}>
            Tous les rôles
          </Btn>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredUsers} 
        isLoading={isLoading}
        emptyMessage="Aucun utilisateur trouvé"
        onRowClick={(index, user) => console.log('Click user', user)}
      />
    </div>
  );
}
