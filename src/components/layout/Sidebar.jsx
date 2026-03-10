import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Inbox, Users, Car, Tag, Wrench, Package, TrendingUp, 
  CreditCard, FileText, UserCog, Settings, LogOut, User 
} from "lucide-react";
import { theme as C } from '@/theme';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/auth.service';
import { toast } from 'react-hot-toast';

const menuItems = [
  { id: "dashboard",  icon: LayoutDashboard, label: "Tableau de bord", path: "/" },
  { id: "demandes",   icon: Inbox,           label: "Demandes clients", path: "/demandes" },
  { id: "clients",    icon: Users,           label: "Clients", path: "/clients" },
  { id: "vehicules",  icon: Car,             label: "Véhicules clients", path: "/vehicules" },
  { id: "catalogue",  icon: Tag,             label: "Catalogue vente", path: "/catalogue" },
  { id: "pieces",     icon: Wrench,          label: "Pièces & Accessoires", path: "/pieces" },
  { id: "commandes",  icon: Package,         label: "Commandes", path: "/commandes" },
  { id: "kanban",     icon: TrendingUp,      label: "Pipeline ventes", path: "/pipeline" },
  { id: "paiements",  icon: CreditCard,      label: "Paiements", path: "/paiements" },
  { id: "factures",   icon: FileText,        label: "Factures", path: "/factures" },
  { id: "users",      icon: UserCog,         label: "Utilisateurs", path: "/users" },
  { id: "settings",   icon: Settings,        label: "Paramètres", path: "/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      toast.success('Déconnexion réussie');
      navigate("/login");
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
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
          const Icon = m.icon;
          return (
            <NavLink 
              key={m.id} 
              to={m.path}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: 10,
                width: "100%", padding: "9px 12px", borderRadius: 8,
                background: isActive ? "rgba(26,115,232,0.2)" : "transparent",
                color: isActive ? C.white : "rgba(255,255,255,0.55)",
                fontSize: 12, fontWeight: isActive ? 600 : 400,
                cursor: "pointer", marginBottom: 2, textAlign: "left",
                textDecoration: "none",
                transition: "all 0.15s", fontFamily: "inherit",
              })}
            >
              <Icon size={16} /> {m.label}
            </NavLink>
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
            <div style={{ fontSize: 11, fontWeight: 600 }}>{user?.prenom} {user?.nom}</div>
            <div style={{ fontSize: 9, color: C.gray }}>{user?.role}</div>
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
  );
};

export default Sidebar;
