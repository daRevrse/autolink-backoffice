import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ChevronLeft, MapPin, Phone, Calendar, Clock, User, 
  MessageSquare, History, FileText, CheckCircle 
} from "lucide-react";
import { theme as C } from '@/theme';
import { 
  Btn, PageHeader, StatusBadge, Badge, Spinner 
} from '@/components/ui';
import { demandesService } from '@/services/demandes.service';
import { formatDate, formatDateTime } from '@/lib/formatters';

export default function DemandeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: demande, isLoading } = useQuery({
    queryKey: ['demande', id],
    queryFn: () => demandesService.getById(id)
  });

  if (isLoading) return <Spinner />;
  if (!demande) return <div>Demande non trouvée</div>;

  return (
    <div>
      <div 
        onClick={() => navigate("/demandes")} 
        style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", marginBottom: 16 }}
      >
        <ChevronLeft size={16} color={C.primary} />
        <span style={{ fontSize: 13, color: C.primary, fontWeight: 600 }}>Retour aux demandes</span>
      </div>

      <PageHeader breadcrumb={`Demande / ${demande.id}`} title={`Détail de la Demande #${demande.id}`}>
        <Btn outline>Modifier</Btn>
        <Btn primary icon={CheckCircle}>Terminer</Btn>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Colonne Gauche */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Infos Générales */}
          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 12, color: C.gray, marginBottom: 4 }}>Type de Demande</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{demande.type}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: C.gray, marginBottom: 4 }}>Priorité</div>
                <Badge color={demande.priority === "URGENTE" ? C.danger : C.primary}>{demande.priority}</Badge>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <Item icon={User} label="Client" value={demande.client} />
              <Item icon={Car} label="Véhicule" value={demande.vehicule} />
              <Item icon={Phone} label="Téléphone" value={demande.phone || "—"} />
              <Item icon={Calendar} label="Date" value={formatDate(demande.date)} />
              {demande.km && <Item icon={TrendingUp} label="Kilométrage" value={demande.km} />}
              <Item icon={Clock} label="Créée le" value={formatDateTime(demande.date)} />
            </div>

            <div style={{ marginTop: 24, padding: 16, background: C.grayLight, borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <MessageSquare size={14} /> Description du problème
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: C.dark }}>
                {demande.problem || "Aucune description fournie."}
              </div>
            </div>
            
            {demande.location && (
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.gray }}>
                <MapPin size={14} /> {demande.location}
              </div>
            )}
          </div>

          {/* Timeline / Historique (Statique pour le moment) */}
          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <History size={18} /> Historique & Notes
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <TimelineItem date="24/02/2026 10:45" user="Amadou Diallo" text="Statut changé de Nouveau vers En cours" />
              <TimelineItem date="24/02/2026 10:30" user="Système" text="Demande créée via l'application mobile" />
            </div>
          </div>
        </div>

        {/* Colonne Droite */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Statut de la demande</div>
            <StatusBadge status={demande.status} />
          </div>

          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Documents associés</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <DocItem name="Devis_089.pdf" size="145 KB" />
              <DocItem name="Photo_Avant_1.jpg" size="2.4 MB" />
              <Btn outline small style={{ width: "100%", marginTop: 8 }}>+ Ajouter un document</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Item = ({ icon: Icon, label, value }) => (
  <div style={{ display: "flex", gap: 10 }}>
    <div style={{ color: C.gray }}><Icon size={16} /></div>
    <div>
      <div style={{ fontSize: 11, color: C.gray, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
    </div>
  </div>
);

const TimelineItem = ({ date, user, text }) => (
  <div style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: 16, position: "relative" }}>
    <div style={{ 
      position: "absolute", left: -6, top: 0, width: 10, height: 10, 
      borderRadius: "50%", background: C.border 
    }} />
    <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>{date} • {user}</div>
    <div style={{ fontSize: 13 }}>{text}</div>
  </div>
);

const DocItem = ({ name, size }) => (
  <div style={{ 
    display: "flex", justifyContent: "space-between", alignItems: "center", 
    padding: "8px 12px", border: `1px solid ${C.border}`, borderRadius: 6 
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FileText size={14} color={C.gray} />
      <div style={{ fontSize: 12, fontWeight: 500 }}>{name}</div>
    </div>
    <div style={{ fontSize: 10, color: C.gray }}>{size}</div>
  </div>
);
