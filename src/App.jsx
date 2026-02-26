import { useState } from "react";
import {
  LayoutDashboard, Inbox, Users, Car, Tag, Wrench, Package, TrendingUp,
  CreditCard, FileText, UserCog, Settings, LogOut, User
} from "lucide-react";
import { theme as C } from "./theme";

import LoginScreen from "./screens/LoginScreen";
import TwoFAScreen from "./screens/TwoFAScreen";
import DashboardScreen from "./screens/DashboardScreen";
import {
  UsersScreen, DemandesScreen, DetailDemandeScreen,
  ClientsScreen, FicheClientScreen, VehiculesScreen,
  CatalogueVenteScreen, PiecesScreen, CommandesScreen,
  KanbanScreen, PaiementsScreen, FacturesScreen, SettingsScreen
} from "./screens/Screens";

const menuItems = [
  { id: "dashboard",  icon: LayoutDashboard, label: "Tableau de bord" },
  { id: "demandes",   icon: Inbox,           label: "Demandes clients" },
  { id: "clients",    icon: Users,           label: "Clients" },
  { id: "vehicules",  icon: Car,             label: "Véhicules clients" },
  { id: "catalogue",  icon: Tag,             label: "Catalogue vente" },
  { id: "pieces",     icon: Wrench,          label: "Pièces & Accessoires" },
  { id: "commandes",  icon: Package,         label: "Commandes" },
  { id: "kanban",     icon: TrendingUp,      label: "Pipeline ventes" },
  { id: "paiements",  icon: CreditCard,      label: "Paiements" },
  { id: "factures",   icon: FileText,        label: "Factures" },
  { id: "users",      icon: UserCog,         label: "Utilisateurs" },
  { id: "settings",   icon: Settings,        label: "Paramètres" },
];

export default function App() {
  const [screen, setScreen] = useState("login");
  const [subScreen, setSubScreen] = useState(null);
  const isAuth = screen === "login" || screen === "2fa";

  const handleLogout = () => { setScreen("login"); setSubScreen(null); };
  const handleLogin = () => setScreen("2fa");
  const handleVerify = () => setScreen("dashboard");
  const navigate = (id) => { setScreen(id); setSubScreen(null); };

  const renderContent = () => {
    if (subScreen === "detail-demande") return <DetailDemandeScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === "fiche-client")   return <FicheClientScreen onBack={() => setSubScreen(null)} />;
    switch (screen) {
      case "login":      return <LoginScreen onLogin={handleLogin} />;
      case "2fa":        return <TwoFAScreen onVerify={handleVerify} />;
      case "dashboard":  return <DashboardScreen />;
      case "users":      return <UsersScreen />;
      case "demandes":   return <DemandesScreen onSelect={setSubScreen} />;
      case "clients":    return <ClientsScreen onSelect={setSubScreen} />;
      case "vehicules":  return <VehiculesScreen />;
      case "catalogue":  return <CatalogueVenteScreen />;
      case "pieces":     return <PiecesScreen />;
      case "commandes":  return <CommandesScreen />;
      case "kanban":     return <KanbanScreen />;
      case "paiements":  return <PaiementsScreen />;
      case "factures":   return <FacturesScreen />;
      case "settings":   return <SettingsScreen />;
      default:           return <DashboardScreen />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* ─── SIDEBAR ─── */}
      {!isAuth && (
        <aside style={{
          width: 220, background: C.darkSidebar, color: C.white,
          display: "flex", flexDirection: "column", flexShrink: 0,
        }}>
          {/* Logo */}
          <div style={{ padding: "20px 18px 6px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Car size={20} color={C.primary} />
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>AUTOLINK</span>
            </div>
            <div style={{
              fontSize: 10, color: C.gray, letterSpacing: 2,
              textTransform: "uppercase", marginTop: 2, marginBottom: 14,
            }}>Back Office</div>
          </div>

          {/* Nav */}
          <nav style={{ padding: "10px 8px", flex: 1, overflowY: "auto" }}>
            {menuItems.map(m => {
              const active = screen === m.id;
              const Icon = m.icon;
              return (
                <button key={m.id} onClick={() => navigate(m.id)} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  width: "100%", padding: "9px 12px", border: "none", borderRadius: 8,
                  background: active ? "rgba(26,115,232,0.2)" : "transparent",
                  color: active ? C.white : "rgba(255,255,255,0.55)",
                  fontSize: 12, fontWeight: active ? 600 : 400,
                  cursor: "pointer", marginBottom: 2, textAlign: "left",
                  transition: "all 0.15s", fontFamily: "inherit",
                }}>
                  <Icon size={16} /> {m.label}
                </button>
              );
            })}
          </nav>

          {/* User + Logout */}
          <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", background: C.primary,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <User size={14} color={C.white} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>A. Diallo</div>
                <div style={{ fontSize: 9, color: C.gray }}>Administrateur</div>
              </div>
            </div>
            <button onClick={handleLogout} style={{
              display: "flex", alignItems: "center", gap: 8,
              width: "100%", padding: "8px 12px",
              border: "1px solid rgba(239,68,68,0.3)", borderRadius: 7,
              background: "rgba(239,68,68,0.1)", color: "#FCA5A5",
              fontSize: 11, fontWeight: 600, cursor: "pointer",
              transition: "all 0.15s", fontFamily: "inherit",
            }}>
              <LogOut size={14} /> Déconnexion
            </button>
          </div>
        </aside>
      )}

      {/* ─── MAIN CONTENT ─── */}
      <main style={{ flex: 1, overflow: "auto", padding: isAuth ? 0 : 24, background: C.bg }}>
        {renderContent()}
      </main>
    </div>
  );
}
