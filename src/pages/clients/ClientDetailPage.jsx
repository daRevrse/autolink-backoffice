import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ChevronLeft, Mail, Phone, MapPin, Calendar, 
  Car, CreditCard, History, Plus
} from "lucide-react";
import { theme as C } from '@/theme';
import { 
  Btn, PageHeader, Badge, Spinner, DataTable 
} from '@/components/ui';
import { clientsService } from '@/services/clients.service';
import { formatFCFA } from '@/lib/formatters';

export default function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: client, isLoading } = useQuery({
    queryKey: ['client', id],
    queryFn: () => clientsService.getById(id)
  });

  if (isLoading) return <Spinner />;
  if (!client) return <div>Client non trouvé</div>;

  return (
    <div>
      <div 
        onClick={() => navigate("/clients")} 
        style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", marginBottom: 16 }}
      >
        <ChevronLeft size={16} color={C.primary} />
        <span style={{ fontSize: 13, color: C.primary, fontWeight: 600 }}>Retour à la liste</span>
      </div>

      <PageHeader breadcrumb={`Clients / ${client.name}`} title={client.name}>
        <Btn outline>Modifier</Btn>
        <Btn primary icon={Plus}>Nouvelle Demande</Btn>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
        {/* Profil Client */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 24, textAlign: 'center' }}>
            <div style={{ 
              width: 80, height: 80, borderRadius: "50%", background: C.primaryLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 800, color: C.primary, margin: '0 auto 16px'
            }}>
              {client.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{client.name}</div>
            <Badge color={client.segment === "VIP" ? C.accent : C.primary}>{client.segment}</Badge>
            
            <div style={{ marginTop: 24, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <InfoItem icon={Mail} label="Email" value={client.email} />
              <InfoItem icon={Phone} label="Téléphone" value={client.phone} />
              <InfoItem icon={MapPin} label="Ville" value={client.city} />
              <InfoItem icon={Calendar} label="Client depuis" value="Janvier 2024" />
            </div>
          </div>

          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Résumé Financier</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: C.gray }}>Total Dépensé</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>{formatFCFA(client.totalSpent)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: C.gray }}>Demandes</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Véhicules & Historique */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Véhicules Enregistrés ({client.vehicles})</span>
              <Btn small outline icon={Plus}>Ajouter</Btn>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <VehicleCard plate="TG 1234 AA" model="Toyota Corolla 2022" />
              {client.vehicles > 1 && <VehicleCard plate="TG 5678 BB" model="Honda Civic 2019" />}
            </div>
          </div>

          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Historique des Services</div>
            <DataTable 
              headers={["Date", "Description", "Montant", "Statut"]}
              rows={[
                ["24/02/2026", "Vidange + Filtres", formatFCFA(45000), <StatusBadge status="COMPLÉTÉ" />],
                ["12/01/2026", "Remplacement Batterie", formatFCFA(75000), <StatusBadge status="COMPLÉTÉ" />],
                ["05/11/2025", "Révision annuelle", formatFCFA(120000), <StatusBadge status="COMPLÉTÉ" />],
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ icon: Icon, label, value }) => (
  <div style={{ display: 'flex', gap: 12 }}>
    <Icon size={16} color={C.gray} style={{ marginTop: 2 }} />
    <div>
      <div style={{ fontSize: 11, color: C.gray }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{value}</div>
    </div>
  </div>
);

const VehicleCard = ({ plate, model }) => (
  <div style={{ 
    padding: 16, border: `1px solid ${C.border}`, borderRadius: 10,
    display: 'flex', alignItems: 'center', gap: 12
  }}>
    <div style={{ 
      width: 40, height: 40, borderRadius: 8, background: '#F1F5F9',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <Car size={20} color={C.gray} />
    </div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 700 }}>{plate}</div>
      <div style={{ fontSize: 11, color: C.gray }}>{model}</div>
    </div>
  </div>
);
