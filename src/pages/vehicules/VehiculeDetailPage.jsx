import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ChevronLeft, Car, User, Calendar, TrendingUp, 
  Wrench, FileText, History, Info, AlertTriangle
} from "lucide-react";
import { theme as C } from '@/theme';
import { 
  Btn, PageHeader, StatusBadge, Badge, Spinner, DataTable 
} from '@/components/ui';
import { vehiculesService } from '@/services/vehicules.service';
import { formatDate } from '@/lib/formatters';

export default function VehiculeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: vehicule, isLoading } = useQuery({
    queryKey: ['vehicule', id],
    queryFn: () => vehiculesService.getById(id)
  });

  if (isLoading) return <Spinner />;
  if (!vehicule) return <div>Véhicule non trouvé</div>;

  return (
    <div>
      <div 
        onClick={() => navigate("/vehicules")} 
        style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", marginBottom: 16 }}
      >
        <ChevronLeft size={16} color={C.primary} />
        <span style={{ fontSize: 13, color: C.primary, fontWeight: 600 }}>Retour au parc</span>
      </div>

      <PageHeader breadcrumb={`Parc / ${vehicule.immatriculation}`} title={`${vehicule.marque} ${vehicule.modele}`}>
        <Btn outline>Modifier les infos</Btn>
        <Btn primary icon={Wrench}>Planifier Entretien</Btn>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Infos Véhicule */}
        <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ 
              width: 56, height: 56, borderRadius: 12, background: '#F1F5F9',
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Car size={32} color={C.gray} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>{vehicule.immatriculation}</div>
              <StatusBadge status={vehicule.status} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <InfoBox label="Marque" value={vehicule.marque} />
            <InfoBox label="Modèle" value={vehicule.modele} />
            <InfoBox label="Année" value={vehicule.annee} />
            <InfoBox label="Kilométrage" value={`${vehicule.km.toLocaleString()} km`} />
          </div>

          <div style={{ marginTop: 32, padding: 16, border: `1px solid ${C.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} color={C.primary} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.gray }}>Propriétaire actuel</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{vehicule.proprietaire}</div>
            </div>
            <Btn small outline style={{ marginLeft: 'auto' }} onClick={() => navigate('/clients/2')}>Voir fiche</Btn>
          </div>
        </div>

        {/* Maintenance & État */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ 
            background: vehicule.nextService === "En retard" ? "#FFF1F2" : C.white, 
            borderRadius: 12, border: `1px solid ${vehicule.nextService === "En retard" ? C.dangerLight : C.border}`, 
            padding: 24 
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={18} color={vehicule.nextService === "En retard" ? C.danger : C.gray} />
              Prochaine Maintenance
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: vehicule.nextService === "En retard" ? C.danger : C.dark }}>
              {vehicule.nextService}
            </div>
            <div style={{ fontSize: 12, color: C.gray, marginTop: 8 }}>
              Basé sur le dernier entretien effectué le 15/05/2025.
            </div>
          </div>

          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Dernières interventions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <HistoryItem date="15/05/2025" type="Vidange complète" km="30,000 km" />
              <HistoryItem date="10/01/2025" type="Pneumatiques" km="25,500 km" />
            </div>
            <Btn small outline style={{ width: '100%', marginTop: 16 }}>Historique Complet</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoBox = ({ label, value }) => (
  <div>
    <div style={{ fontSize: 10, color: C.gray, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 15, fontWeight: 600 }}>{value}</div>
  </div>
);

const HistoryItem = ({ date, type, km }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
    <div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{type}</div>
      <div style={{ fontSize: 11, color: C.gray }}>{date}</div>
    </div>
    <div style={{ fontSize: 12, fontWeight: 500 }}>{km}</div>
  </div>
);
