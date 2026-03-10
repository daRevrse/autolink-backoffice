import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Plus,
  Download,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  Shield,
  Wrench,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Star,
  Image,
  RefreshCw,
  FileDown,
  DollarSign,
  Truck,
  ClipboardList,
  Bell,
  Columns,
  Table2,
  CalendarDays,
  User,
  Key,
  Upload,
  Zap,
  Settings,
  Info,
  GripVertical,
  Car,
  Package,
  Mail,
  Send,
  Ban,
  FileText,
  CreditCard,
  Calendar,
} from "lucide-react";
import { theme as C } from "../theme";
import {
  Badge,
  StatusBadge,
  KPICard,
  Btn,
  SearchInput,
  Select,
  DataTable,
  Tabs,
  FormField,
  PageHeader,
} from "../components/ui";

// ─── USERS ───────────────────────────────────────────────
export function UsersScreen() {
  return (
    <div>
      <PageHeader breadcrumb="Administration" title="Utilisateurs internes">
        <Btn primary icon={Plus}>
          Nouvel utilisateur
        </Btn>
        <Btn icon={Download}>Exporter</Btn>
      </PageHeader>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <SearchInput
          placeholder="Rechercher un utilisateur..."
          style={{ flex: 1 }}
        />
        <Select>Rôle: Tous</Select>
        <Select>Statut: Tous</Select>
      </div>
      <DataTable
        headers={[
          "Nom",
          "Email",
          "Rôle",
          "Statut",
          "Dernière connexion",
          "Actions",
        ]}
        rows={[
          [
            <b>Amadou DIALLO</b>,
            "amadou@autolink.tg",
            <Badge color={C.primary} icon={Shield}>
              Administrateur
            </Badge>,
            <StatusBadge status="Actif" />,
            "24/02/2026 08:45",
            <span style={{ display: "flex", gap: 6 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Trash2} />
            </span>,
          ],
          [
            "Koffi MENSAH",
            "koffi@autolink.tg",
            <Badge color={C.success} icon={Wrench}>
              Mécanicien
            </Badge>,
            <StatusBadge status="Actif" />,
            "24/02/2026 07:30",
            <span style={{ display: "flex", gap: 6 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Trash2} />
            </span>,
          ],
          [
            "Ama AGBEKO",
            "ama@autolink.tg",
            <Badge color={C.warning} icon={ClipboardList}>
              Secrétaire
            </Badge>,
            <StatusBadge status="Actif" />,
            "23/02/2026 17:00",
            <span style={{ display: "flex", gap: 6 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Trash2} />
            </span>,
          ],
          [
            "Yao ATTIOGBE",
            "yao@autolink.tg",
            <Badge color={C.accent} icon={Truck}>
              Livreur
            </Badge>,
            <StatusBadge status="Inactif" />,
            "15/02/2026 12:00",
            <span style={{ display: "flex", gap: 6 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Trash2} />
            </span>,
          ],
          [
            "Essi KOUEVI",
            "essi@autolink.tg",
            <Badge color={C.success} icon={Wrench}>
              Mécanicien
            </Badge>,
            <StatusBadge status="Actif" />,
            "24/02/2026 09:15",
            <span style={{ display: "flex", gap: 6 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Trash2} />
            </span>,
          ],
        ]}
      />
    </div>
  );
}

// ─── DEMANDES ────────────────────────────────────────────
export function DemandesScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Toutes");
  return (
    <div>
      <PageHeader breadcrumb="Gestion" title="Demandes clients" />
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <SearchInput
          placeholder="Rechercher une demande..."
          style={{ flex: 1 }}
        />
        <Select>Type: Tous</Select>
        <Select>Priorité: Toutes</Select>
      </div>
      <Tabs
        tabs={[
          { label: "Toutes", count: 42 },
          { label: "Nouvelles", count: 7 },
          { label: "En cours", count: 12 },
          { label: "En attente", count: 5 },
          { label: "Complétées", count: 15 },
        ]}
        active={tab}
        onSelect={setTab}
      />
      <DataTable
        headers={[
          "#",
          "Type",
          "Client",
          "Véhicule",
          "Date",
          "Statut",
          "Priorité",
          "Action",
        ]}
        onRowClick={(row) => navigate(`/demandes/${row[0].props.children}`)}
        rows={[
          [
            <b>DM-089</b>,
            <Badge color={C.danger} icon={Zap}>
              Dépannage
            </Badge>,
            "Kofi AMEGAH",
            "Toyota Hilux 2020",
            "24/02 10:30",
            <StatusBadge status="NOUVEAU" />,
            <StatusBadge status="URGENTE" />,
            <Btn small primary icon={ChevronRight}>
              Traiter
            </Btn>,
          ],
          [
            "DM-088",
            <Badge color={C.primary} icon={Wrench}>
              Entretien
            </Badge>,
            "Ama KOFFI",
            "Honda Civic 2019",
            "24/02 09:00",
            <StatusBadge status="EN COURS" />,
            <Badge color={C.warning}>Haute</Badge>,
            <Btn small outline icon={Eye}>
              Voir
            </Btn>,
          ],
          [
            "DM-087",
            <Badge color={C.accent} icon={Car}>
              Achat
            </Badge>,
            "Jean DUPONT",
            "—",
            "23/02 16:45",
            <StatusBadge status="EN ATTENTE" />,
            <Badge color={C.primary}>Normale</Badge>,
            <Btn small outline icon={Eye}>
              Voir
            </Btn>,
          ],
          [
            "DM-086",
            <Badge color={C.success} icon={Package}>
              Pièces
            </Badge>,
            "Essi LAWSON",
            "Peugeot 308 2021",
            "23/02 14:20",
            <StatusBadge status="COMPLÉTÉ" />,
            <Badge color={C.gray}>Basse</Badge>,
            <Btn small outline icon={Eye}>
              Voir
            </Btn>,
          ],
          [
            "DM-085",
            <Badge color={C.warning} icon={Key}>
              Location
            </Badge>,
            "Kodjo AKAKPO",
            "—",
            "23/02 11:00",
            <StatusBadge status="COMPLÉTÉ" />,
            <Badge color={C.primary}>Normale</Badge>,
            <Btn small outline icon={Eye}>
              Voir
            </Btn>,
          ],
        ]}
      />
    </div>
  );
}

// ─── DETAIL DEMANDE ──────────────────────────────────────
export function DetailDemandeScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
          cursor: "pointer",
        }}
        onClick={() => navigate("/demandes")}
      >
        <ChevronLeft size={16} color={C.primary} />
        <span style={{ fontSize: 12, color: C.primary }}>
          Retour aux demandes
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700 }}>Demande #{id || "DM-089"}</span>
        <Badge color={C.danger} icon={Zap}>
          Dépannage
        </Badge>
        <StatusBadge status="URGENTE" />
        <StatusBadge status="NOUVEAU" />
      </div>
      <div
        style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
      >
        <Btn primary icon={CheckCircle}>
          Accepter
        </Btn>
        <Btn outline icon={User}>
          Attribuer
        </Btn>
        <Btn icon={Clock}>Suspendre</Btn>
        <Btn icon={XCircle}>Annuler</Btn>
        <Btn accent icon={FileText}>
          Générer devis
        </Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div
          style={{
            background: C.white,
            borderRadius: 10,
            padding: 18,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 14,
              color: C.primary,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Info size={15} /> Informations
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <FormField label="Client" value="Kofi AMEGAH" />
            <FormField label="Téléphone" value="+228 91 23 45 67" />
            <FormField label="Véhicule" value="Toyota Hilux 2020" />
            <FormField label="Kilométrage" value="65 400 km" />
            <FormField label="Problème" value="Batterie — Ne démarre plus" />
            <FormField label="Localisation" value="Agbalépédogan, Lomé" />
            <FormField label="Date demande" value="24/02/2026 à 10:30" />
            <FormField label="Urgence" value="URGENTE" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              background: C.white,
              borderRadius: 10,
              padding: 18,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 10,
                color: C.primary,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Settings size={15} /> Gestion
            </div>
            <FormField label="Statut" value="Nouveau" type="select" />
            <FormField
              label="Attribuer à"
              placeholder="Sélectionner un mécanicien"
              type="select"
            />
          </div>
          <div
            style={{
              background: C.white,
              borderRadius: 10,
              padding: 18,
              border: `1px solid ${C.border}`,
              flex: 1,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 10,
                color: C.primary,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Clock size={15} /> Historique
            </div>
            {[
              {
                t: "24/02 10:30",
                a: "Demande créée via app mobile",
                by: "Client",
              },
              { t: "24/02 10:32", a: "Notification envoyée", by: "Système" },
            ].map((e, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  fontSize: 12,
                  marginBottom: 8,
                  paddingBottom: 8,
                  borderBottom: i < 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <span style={{ color: C.gray, whiteSpace: "nowrap" }}>
                  {e.t}
                </span>
                <span style={{ flex: 1 }}>{e.a}</span>
                <Badge>{e.by}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CLIENTS ─────────────────────────────────────────────
export function ClientsScreen() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader breadcrumb="Gestion" title="Base de données clients">
        <Btn primary icon={Send}>
          Campagne SMS/Email
        </Btn>
        <Btn icon={Download}>Exporter</Btn>
      </PageHeader>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <SearchInput
          placeholder="Rechercher un client..."
          style={{ flex: 1 }}
        />
        <Select>Statut: Tous</Select>
        <Select>Segment: Tous</Select>
      </div>
      <DataTable
        headers={[
          "Client",
          "Téléphone",
          "Véhicules",
          "Total dépensé",
          "Statut",
          "Dernier service",
          "Actions",
        ]}
        onRowClick={() => navigate("/clients/1")}
        rows={[
          [
            <b>Jean DUPONT</b>,
            "+228 90 XX XX",
            "2",
            "1 450 000 F",
            <StatusBadge status="VIP" />,
            "20/02/2026",
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Mail} />
            </span>,
          ],
          [
            "Kofi AMEGAH",
            "+228 91 XX XX",
            "1",
            "780 000 F",
            <StatusBadge status="Actif" />,
            "24/02/2026",
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Mail} />
            </span>,
          ],
          [
            "Ama KOFFI",
            "+228 92 XX XX",
            "1",
            "350 000 F",
            <StatusBadge status="Actif" />,
            "18/02/2026",
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Mail} />
            </span>,
          ],
          [
            "Essi LAWSON",
            "+228 93 XX XX",
            "3",
            "2 100 000 F",
            <StatusBadge status="VIP" />,
            "23/02/2026",
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Mail} />
            </span>,
          ],
          [
            "Yao MENSAH",
            "+228 94 XX XX",
            "1",
            "45 000 F",
            <StatusBadge status="Inactif" />,
            "05/01/2026",
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Mail} />
            </span>,
          ],
        ]}
      />
    </div>
  );
}

// ─── FICHE CLIENT ────────────────────────────────────────
export function FicheClientScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState("Informations");
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
          cursor: "pointer",
        }}
        onClick={() => navigate("/clients")}
      >
        <ChevronLeft size={16} color={C.primary} />
        <span style={{ fontSize: 12, color: C.primary }}>
          Retour aux clients
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: C.primaryLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <User size={22} color={C.primary} />
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Jean DUPONT</div>
          <div style={{ fontSize: 12, color: C.gray }}>
            jean.dupont@email.com · +228 90 XX XX XX · Lomé
          </div>
        </div>
        <StatusBadge status="VIP" />
        <StatusBadge status="Actif" />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Btn outline icon={Edit}>
          Modifier
        </Btn>
        <Btn outline icon={Mail}>
          Message
        </Btn>
        <Btn icon={Ban}>Bloquer</Btn>
      </div>
      <div
        style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}
      >
        <KPICard
          icon={DollarSign}
          label="Total dépensé"
          value="1 450 000 F"
          color={C.primary}
        />
        <KPICard icon={Car} label="Véhicules" value="2" />
        <KPICard icon={Wrench} label="Services" value="8" color={C.success} />
        <KPICard
          icon={Calendar}
          label="Dernier service"
          value="20/02/2026"
          color={C.gray}
        />
      </div>
      <Tabs
        tabs={[
          { label: "Informations" },
          { label: "Véhicules", count: 2 },
          { label: "Services", count: 8 },
          { label: "Transactions", count: 12 },
          { label: "Notes" },
        ]}
        active={tab}
        onSelect={setTab}
      />
      <div
        style={{
          background: C.white,
          borderRadius: 10,
          padding: 18,
          border: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <FormField label="Nom" value="DUPONT" />
          <FormField label="Prénom" value="Jean" />
          <FormField label="Email" value="jean.dupont@email.com" />
          <FormField label="Téléphone" value="+228 90 XX XX XX" />
          <FormField label="Sexe" value="Homme" />
          <FormField label="Adresse" value="123 Rue de la Paix, Lomé" />
          <FormField label="CIN/Passeport" value="TG-XXXXXXX" />
          <FormField label="Date inscription" value="15/01/2025" />
        </div>
      </div>
    </div>
  );
}

// ─── VEHICULES ───────────────────────────────────────────
export function VehiculesScreen() {
  return (
    <div>
      <PageHeader breadcrumb="Gestion" title="Véhicules clients">
        <Btn icon={Download}>Exporter</Btn>
      </PageHeader>
      <SearchInput
        placeholder="Rechercher par immatriculation, marque, client..."
        style={{ marginBottom: 14 }}
      />
      <DataTable
        headers={[
          "Immatriculation",
          "Véhicule",
          "Propriétaire",
          "Km",
          "Statut",
          "Prochain entretien",
          "Actions",
        ]}
        rows={[
          [
            <b>TG 1234 AA</b>,
            "Toyota Corolla 2022",
            "Jean DUPONT",
            "32 450",
            <StatusBadge status="Actif" />,
            <span style={{ color: C.primary }}>15/03/2026</span>,
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small outline icon={FileText} />
              <Btn small primary icon={Wrench} />
            </span>,
          ],
          [
            <b>TG 5678 BB</b>,
            "Honda Civic 2019",
            "Jean DUPONT",
            "87 200",
            <StatusBadge status="Actif" />,
            <Badge color={C.danger} bg={C.dangerLight} icon={AlertTriangle}>
              EN RETARD
            </Badge>,
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small outline icon={FileText} />
              <Btn small primary icon={Wrench} />
            </span>,
          ],
          [
            <b>TG 9876 CC</b>,
            "Toyota Hilux 2020",
            "Kofi AMEGAH",
            "65 400",
            <StatusBadge status="Actif" />,
            "10/04/2026",
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small outline icon={FileText} />
              <Btn small primary icon={Wrench} />
            </span>,
          ],
          [
            <b>TG 1111 DD</b>,
            "Peugeot 308 2021",
            "Essi LAWSON",
            "42 000",
            <StatusBadge status="Actif" />,
            "28/02/2026",
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small outline icon={FileText} />
              <Btn small primary icon={Wrench} />
            </span>,
          ],
        ]}
      />
    </div>
  );
}

// ─── CATALOGUE VENTE ─────────────────────────────────────
export function CatalogueVenteScreen() {
  return (
    <div>
      <PageHeader breadcrumb="Catalogue" title="Véhicules à vendre">
        <Btn primary icon={Plus}>
          Ajouter un véhicule
        </Btn>
        <Btn icon={Download}>Exporter</Btn>
      </PageHeader>
      <SearchInput
        placeholder="Rechercher un véhicule..."
        style={{ marginBottom: 14 }}
      />
      <DataTable
        headers={[
          "Véhicule",
          "État",
          "Prix",
          "Km",
          "Stock",
          "Visible",
          "Actions",
        ]}
        rows={[
          [
            <b>Toyota RAV4 2024</b>,
            <Badge color={C.success} icon={CheckCircle}>
              Neuf
            </Badge>,
            "18 500 000 F",
            "0",
            "1",
            <span
              style={{
                color: C.success,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <CheckCircle size={12} /> Oui
            </span>,
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Image} />
            </span>,
          ],
          [
            "Honda CR-V 2021",
            <Badge color={C.warning} icon={RefreshCw}>
              Occasion
            </Badge>,
            "12 000 000 F",
            "45 000",
            "1",
            <span
              style={{
                color: C.success,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <CheckCircle size={12} /> Oui
            </span>,
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Image} />
            </span>,
          ],
          [
            <b>Hyundai Tucson 2023</b>,
            <Badge color={C.success} icon={CheckCircle}>
              Neuf
            </Badge>,
            "16 200 000 F",
            "0",
            "2",
            <span
              style={{
                color: C.success,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <CheckCircle size={12} /> Oui
            </span>,
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Image} />
            </span>,
          ],
          [
            "Toyota Camry 2020",
            <Badge color={C.warning} icon={RefreshCw}>
              Occasion
            </Badge>,
            "9 800 000 F",
            "72 000",
            "1",
            <span
              style={{
                color: C.gray,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <XCircle size={12} /> Non
            </span>,
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={Edit} />
              <Btn small icon={Image} />
            </span>,
          ],
        ]}
      />
    </div>
  );
}

// ─── PIÈCES ──────────────────────────────────────────────
export function PiecesScreen() {
  return (
    <div>
      <PageHeader breadcrumb="Catalogue" title="Pièces & Accessoires">
        <Btn primary icon={Plus}>
          Ajouter une pièce
        </Btn>
        <Btn icon={Upload}>Import CSV</Btn>
        <Btn accent icon={AlertTriangle}>
          Alertes stock (3)
        </Btn>
      </PageHeader>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <SearchInput
          placeholder="Rechercher une pièce..."
          style={{ flex: 1 }}
        />
        <Select>Catégorie: Toutes</Select>
        <Select>Stock: Tous</Select>
      </div>
      <DataTable
        headers={[
          "Référence",
          "Désignation",
          "Catégorie",
          "Prix achat",
          "Prix vente",
          "Stock",
          "Compatibilité",
          "Actions",
        ]}
        rows={[
          [
            "TOY-OF-04152",
            "Filtre à huile Toyota",
            <Badge icon={Settings}>Moteur</Badge>,
            "5 000 F",
            "8 500 F",
            <Badge color={C.success} bg={C.successLight}>
              15
            </Badge>,
            "Corolla, Camry, RAV4",
            <Btn small outline icon={Edit} />,
          ],
          [
            "BOS-BP-308",
            "Plaquettes frein Bosch",
            <Badge color={C.accent} icon={Wrench}>
              Freinage
            </Badge>,
            "15 000 F",
            "22 000 F",
            <Badge color={C.success} bg={C.successLight}>
              8
            </Badge>,
            "Universel",
            <Btn small outline icon={Edit} />,
          ],
          [
            "VAR-BAT-60",
            "Batterie Varta 60Ah",
            <Badge color={C.warning} icon={Zap}>
              Électrique
            </Badge>,
            "32 000 F",
            "45 000 F",
            <Badge color={C.danger} bg={C.dangerLight} icon={AlertTriangle}>
              2
            </Badge>,
            "Multi-marques",
            <Btn small outline icon={Edit} />,
          ],
          [
            "MIC-AIR-001",
            "Filtre à air Microg.",
            <Badge icon={Settings}>Moteur</Badge>,
            "3 500 F",
            "6 000 F",
            <Badge color={C.danger} bg={C.dangerLight} icon={AlertTriangle}>
              0
            </Badge>,
            "Civic, Accord",
            <Btn small outline icon={Edit} />,
          ],
        ]}
      />
    </div>
  );
}

// ─── COMMANDES ───────────────────────────────────────────
export function CommandesScreen() {
  const [tab, setTab] = useState("Toutes");
  return (
    <div>
      <PageHeader breadcrumb="Gestion" title="Commandes de pièces" />
      <Tabs
        tabs={[
          { label: "Toutes", count: 28 },
          { label: "En attente", count: 4 },
          { label: "En préparation", count: 3 },
          { label: "Prêtes", count: 2 },
          { label: "Livrées", count: 17 },
        ]}
        active={tab}
        onSelect={setTab}
      />
      <DataTable
        headers={[
          "N° Cmd",
          "Client",
          "Articles",
          "Total",
          "Paiement",
          "Livraison",
          "Statut",
          "Actions",
        ]}
        rows={[
          [
            <b>CMD-157</b>,
            "Jean DUPONT",
            "2 articles",
            "52 500 F",
            <Badge color={C.success} bg={C.successLight} icon={CheckCircle}>
              Payé
            </Badge>,
            "Retrait",
            <StatusBadge status="EN COURS" />,
            <Btn small primary icon={ClipboardList}>
              Préparer
            </Btn>,
          ],
          [
            "CMD-156",
            "Ama KOFFI",
            "1 article",
            "22 000 F",
            <Badge color={C.success} bg={C.successLight} icon={CheckCircle}>
              Payé
            </Badge>,
            "Livraison",
            <StatusBadge status="EN ATTENTE" />,
            <Btn small accent icon={Truck}>
              Expédier
            </Btn>,
          ],
          [
            "CMD-155",
            "Kofi AMEGAH",
            "3 articles",
            "95 000 F",
            <Badge color={C.warning} bg={C.warningLight} icon={Clock}>
              Attente
            </Badge>,
            "Garage",
            <StatusBadge status="EN ATTENTE" />,
            <Btn small outline icon={Bell}>
              Relancer
            </Btn>,
          ],
          [
            "CMD-154",
            "Essi LAWSON",
            "1 article",
            "45 000 F",
            <Badge color={C.success} bg={C.successLight} icon={CheckCircle}>
              Payé
            </Badge>,
            "Retrait",
            <StatusBadge status="COMPLÉTÉ" />,
            <Btn small outline icon={FileText}>
              Facture
            </Btn>,
          ],
        ]}
      />
    </div>
  );
}

// ─── KANBAN ──────────────────────────────────────────────
export function KanbanScreen() {
  const cols = [
    {
      title: "Nouvelles",
      count: 3,
      color: C.danger,
      cards: [
        {
          id: "VH-042",
          car: "RAV4 2024",
          client: "J. Dupont",
          info: "18.5M F",
        },
        {
          id: "VH-041",
          car: "Tucson 2023",
          client: "K. Amegah",
          info: "16.2M F",
        },
      ],
    },
    {
      title: "Négociation",
      count: 2,
      color: C.warning,
      cards: [
        {
          id: "VH-038",
          car: "CR-V 2021",
          client: "E. Lawson",
          info: "Offre: 11M vs 12M",
        },
      ],
    },
    {
      title: "Paiement",
      count: 1,
      color: C.primary,
      cards: [
        {
          id: "VH-035",
          car: "Camry 2020",
          client: "A. Koffi",
          info: "9.8M · 50% payé",
        },
      ],
    },
    {
      title: "Préparation",
      count: 1,
      color: C.accent,
      cards: [
        {
          id: "VH-033",
          car: "Civic 2019",
          client: "Y. Mensah",
          info: "Carte grise en cours",
        },
      ],
    },
    {
      title: "Livrées",
      count: 8,
      color: C.success,
      cards: [
        {
          id: "8 véhicules",
          car: "Ce mois",
          client: "",
          info: "85,4M FCFA total",
        },
      ],
    },
  ];
  return (
    <div>
      <PageHeader breadcrumb="Ventes" title="Pipeline achat véhicules">
        <Btn primary icon={Columns}>
          Kanban
        </Btn>
        <Btn icon={Table2}>Tableau</Btn>
        <Btn icon={CalendarDays}>Calendrier</Btn>
      </PageHeader>
      <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
        {cols.map((col) => (
          <div
            key={col.title}
            style={{
              minWidth: 200,
              flex: 1,
              background: C.grayLight,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: col.color,
                padding: "8px 12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: C.white, fontWeight: 700, fontSize: 12 }}>
                {col.title}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 11,
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 10,
                  padding: "1px 8px",
                }}
              >
                {col.count}
              </span>
            </div>
            <div
              style={{
                padding: 8,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {col.cards.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: C.white,
                    borderRadius: 8,
                    padding: "10px 12px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    cursor: "grab",
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginBottom: 2,
                    }}
                  >
                    <GripVertical size={10} color={C.grayMid} />
                    <span style={{ fontSize: 12, fontWeight: 700 }}>
                      {c.id}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, marginBottom: 2 }}>{c.car}</div>
                  {c.client && (
                    <div style={{ fontSize: 10, color: C.gray }}>
                      {c.client}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: 10,
                      color: col.color,
                      marginTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    {c.info}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAIEMENTS ───────────────────────────────────────────
export function PaiementsScreen() {
  return (
    <div>
      <PageHeader breadcrumb="Finances" title="Suivi des paiements" />
      <div
        style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}
      >
        <KPICard
          icon={DollarSign}
          label="Total ce mois"
          value="8,4M F"
          color={C.success}
        />
        <KPICard
          icon={Clock}
          label="En attente"
          value="1,2M F"
          sub="4 paiements"
          color={C.warning}
        />
        <KPICard
          icon={XCircle}
          label="Échoués"
          value="85 000 F"
          sub="2 paiements"
          color={C.danger}
        />
        <KPICard
          icon={RefreshCw}
          label="Remboursés"
          value="120 000 F"
          color={C.gray}
        />
      </div>
      <DataTable
        headers={[
          "Réf",
          "Date",
          "Client",
          "Service",
          "Montant",
          "Mode",
          "Statut",
          "Facture",
        ]}
        rows={[
          [
            "PAY-312",
            "24/02 15:02",
            "J. Dupont",
            "Pièces CMD-157",
            "52 500 F",
            "Mobile Money",
            <StatusBadge status="Payé" />,
            <Btn small outline icon={FileDown}>
              F-312
            </Btn>,
          ],
          [
            "PAY-311",
            "24/02 11:45",
            "A. Koffi",
            "Entretien ENT-089",
            "85 000 F",
            "Carte Visa",
            <StatusBadge status="Payé" />,
            <Btn small outline icon={FileDown}>
              F-311
            </Btn>,
          ],
          [
            "PAY-310",
            "23/02 16:30",
            "K. Amegah",
            "Pièces CMD-155",
            "95 000 F",
            "Virement",
            <StatusBadge status="Impayé" />,
            <span>—</span>,
          ],
          [
            "PAY-309",
            "23/02 14:00",
            "E. Lawson",
            "Location LOC-023",
            "150 000 F",
            "Mobile Money",
            <StatusBadge status="Échoué" />,
            <span>—</span>,
          ],
        ]}
      />
    </div>
  );
}

// ─── FACTURES ────────────────────────────────────────────
export function FacturesScreen() {
  return (
    <div>
      <PageHeader breadcrumb="Finances" title="Facturation">
        <Btn primary icon={Plus}>
          Nouvelle facture
        </Btn>
        <Btn icon={Download}>Exporter tout</Btn>
      </PageHeader>
      <DataTable
        headers={[
          "N° Facture",
          "Date",
          "Client",
          "Service",
          "Montant HT",
          "TVA",
          "Total TTC",
          "Statut",
          "Actions",
        ]}
        rows={[
          [
            <b>F-2026-0312</b>,
            "24/02/2026",
            "J. Dupont",
            "CMD-157",
            "47 727 F",
            "4 773 F",
            "52 500 F",
            <StatusBadge status="Payé" />,
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={FileDown} />
              <Btn small outline icon={Mail} />
            </span>,
          ],
          [
            "F-2026-0311",
            "24/02/2026",
            "A. Koffi",
            "ENT-089",
            "77 273 F",
            "7 727 F",
            "85 000 F",
            <StatusBadge status="Payé" />,
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={FileDown} />
              <Btn small outline icon={Mail} />
            </span>,
          ],
          [
            "F-2026-0310",
            "23/02/2026",
            "K. Amegah",
            "CMD-155",
            "86 364 F",
            "8 636 F",
            "95 000 F",
            <StatusBadge status="Impayé" />,
            <span style={{ display: "flex", gap: 4 }}>
              <Btn small outline icon={FileDown} />
              <Btn small outline icon={Mail} />
              <Btn small accent icon={RefreshCw} />
            </span>,
          ],
        ]}
      />
      {/* Invoice preview */}
      <div
        style={{
          marginTop: 20,
          background: C.white,
          borderRadius: 10,
          border: `1px solid ${C.border}`,
          padding: 20,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Eye size={15} /> Aperçu facture
        </div>
        <div
          style={{
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
              paddingBottom: 16,
              borderBottom: `2px solid ${C.primary}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Car size={22} color={C.primary} />
              <div>
                <div
                  style={{ fontSize: 18, fontWeight: 800, color: C.primary }}
                >
                  AUTOLINK SOLUTIONS
                </div>
                <div style={{ fontSize: 10, color: C.gray }}>
                  Lomé, Togo · contact@autolink.tg
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>FACTURE</div>
              <div style={{ fontSize: 11, color: C.gray }}>
                F-2026-0312 · 24/02/2026
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              marginBottom: 14,
            }}
          >
            <div>
              <b>Client :</b> Jean DUPONT
              <br />
              Lomé, Togo
            </div>
            <div style={{ textAlign: "right" }}>
              <b>Échéance :</b> 24/03/2026
            </div>
          </div>
          <table
            style={{
              width: "100%",
              fontSize: 11,
              borderCollapse: "collapse",
              marginBottom: 12,
            }}
          >
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                <th style={{ textAlign: "left", padding: 6 }}>Désignation</th>
                <th style={{ padding: 6 }}>Qté</th>
                <th style={{ padding: 6 }}>PU</th>
                <th style={{ textAlign: "right", padding: 6 }}>Montant</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${C.grayLight}` }}>
                <td style={{ padding: 6 }}>Filtre à huile Toyota</td>
                <td style={{ textAlign: "center", padding: 6 }}>1</td>
                <td style={{ textAlign: "center", padding: 6 }}>8 500</td>
                <td style={{ textAlign: "right", padding: 6 }}>8 500 F</td>
              </tr>
              <tr>
                <td style={{ padding: 6 }}>Plaquettes frein Bosch</td>
                <td style={{ textAlign: "center", padding: 6 }}>2</td>
                <td style={{ textAlign: "center", padding: 6 }}>22 000</td>
                <td style={{ textAlign: "right", padding: 6 }}>44 000 F</td>
              </tr>
            </tbody>
          </table>
          <div style={{ textAlign: "right", fontSize: 12 }}>
            <div>
              Sous-total HT : <b>47 727 F</b>
            </div>
            <div>TVA 10% : 4 773 F</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: C.primary,
                marginTop: 4,
              }}
            >
              TOTAL TTC : 52 500 FCFA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PARAMÈTRES ──────────────────────────────────────────
export function SettingsScreen() {
  const [tab, setTab] = useState("Entreprise");
  return (
    <div>
      <PageHeader breadcrumb="Administration" title="Paramètres" />
      <Tabs
        tabs={[
          { label: "Entreprise" },
          { label: "Services" },
          { label: "Paiements" },
          { label: "Notifications" },
          { label: "Rappels" },
          { label: "Intégrations" },
        ]}
        active={tab}
        onSelect={setTab}
      />
      <div
        style={{
          background: C.white,
          borderRadius: 10,
          padding: 20,
          border: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <FormField label="Nom de l'entreprise" value="AutoLink Solutions" />
          <FormField label="Adresse" value="Quartier XYZ, Lomé, Togo" />
          <FormField label="Téléphone" value="+228 XX XX XX XX" />
          <FormField label="Email" value="contact@autolink.tg" />
          <FormField label="RCCM" value="TG-LOM-XXXX" />
          <FormField label="NIF" value="XXXXXXX" />
          <FormField label="Taux TVA (%)" value="10" />
          <FormField label="Devise" value="FCFA (XOF)" />
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
          <Btn primary icon={CheckCircle}>
            Sauvegarder
          </Btn>
          <Btn>Annuler</Btn>
        </div>
      </div>
    </div>
  );
}
