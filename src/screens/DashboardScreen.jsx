import {
  Users, Wrench, DollarSign, Inbox, BarChart3, PieChart,
  AlertTriangle, CreditCard, Package, Zap, ChevronRight, Eye
} from "lucide-react";
import { theme as C } from "../theme";
import { Badge, StatusBadge, KPICard, Btn, DataTable, PageHeader } from "../components/ui";

export default function DashboardScreen() {
  return (
    <div>
      <PageHeader breadcrumb="Accueil" title="Tableau de bord" />

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <KPICard icon={Users} label="Clients actifs" value="1 247" sub="↑ 12% ce mois" color={C.primary} />
        <KPICard icon={Wrench} label="Services aujourd'hui" value="18" sub="5 en cours" color={C.success} />
        <KPICard icon={DollarSign} label="Revenus du mois" value="8,4M F" sub="↑ 8% vs mois préc." color={C.accent} />
        <KPICard icon={Inbox} label="Demandes en attente" value="7" sub="2 urgentes" color={C.danger} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        {/* Bar Chart */}
        <div style={{ background: C.white, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <BarChart3 size={16} color={C.primary} /> Évolution du CA (6 mois)
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
            {[45, 58, 72, 65, 82, 90].map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", height: h, background: `linear-gradient(180deg, ${C.primary}, ${C.primaryDark})`, borderRadius: 4 }} />
                <span style={{ fontSize: 9, color: C.gray }}>{["Sep", "Oct", "Nov", "Déc", "Jan", "Fév"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart */}
        <div style={{ background: C.white, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <PieChart size={16} color={C.primary} /> Répartition par service
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{
              width: 90, height: 90, borderRadius: "50%", flexShrink: 0, position: "relative",
              background: `conic-gradient(${C.primary} 0% 35%, ${C.success} 35% 60%, ${C.accent} 60% 80%, ${C.warning} 80% 95%, ${C.gray} 95% 100%)`,
            }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: C.white, position: "absolute", top: 20, left: 20 }} />
            </div>
            <div style={{ fontSize: 11, lineHeight: 2.2 }}>
              {[
                { c: C.primary, l: "Entretien 35%" },
                { c: C.success, l: "Pièces 25%" },
                { c: C.accent, l: "Location 20%" },
                { c: C.warning, l: "Vente 15%" },
              ].map(x => (
                <div key={x.l}>
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: x.c, marginRight: 6 }} />
                  {x.l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
        <AlertTriangle size={16} color={C.warning} /> Alertes & actions rapides
      </div>
      <DataTable
        headers={["Type", "Détail", "Priorité", "Action"]}
        rows={[
          [<Badge color={C.danger} icon={Zap}>Dépannage</Badge>, "DP-089 — Kofi AMEGAH", <StatusBadge status="URGENTE" />, <Btn small primary icon={ChevronRight}>Traiter</Btn>],
          [<Badge color={C.warning} icon={CreditCard}>Paiement</Badge>, "CMD-157 — 52 500 F", <Badge color={C.warning}>HAUTE</Badge>, <Btn small outline icon={Eye}>Voir</Btn>],
          [<Badge color={C.primary} icon={Wrench}>Entretien</Badge>, "RDV 14h — Toyota Corolla", <Badge color={C.primary}>NORMALE</Badge>, <Btn small outline icon={Eye}>Détail</Btn>],
          [<Badge color={C.accent} icon={Package}>Stock</Badge>, "Batterie Varta — 2 restantes", <Badge color={C.gray}>BASSE</Badge>, <Btn small outline icon={Package}>Commander</Btn>],
        ]}
      />
    </div>
  );
}
