import {
  CircleDot, Activity, Clock, CheckCircle, XCircle, AlertTriangle, Star, Info,
  ArrowUpRight, ArrowDownRight, Search
} from "lucide-react";
import { theme as C } from "../theme";

// ─── Badge ───────────────────────────────────────────────
export const Badge = ({ children, color = C.primary, bg, icon: Icon }) => (
  <span style={{
    background: bg || `${color}18`, color, fontSize: 11, fontWeight: 600,
    padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap",
    display: "inline-flex", alignItems: "center", gap: 4,
  }}>
    {Icon && <Icon size={11} />}{children}
  </span>
);

// ─── StatusBadge ─────────────────────────────────────────
const statusMap = {
  "NOUVEAU":    { bg: C.dangerLight,  color: C.danger,  icon: CircleDot },
  "EN COURS":   { bg: C.primaryLight, color: C.primary, icon: Activity },
  "EN ATTENTE": { bg: C.warningLight, color: C.warning, icon: Clock },
  "COMPLÉTÉ":   { bg: C.successLight, color: C.success, icon: CheckCircle },
  "ANNULÉ":     { bg: C.grayLight,    color: C.gray,    icon: XCircle },
  "URGENTE":    { bg: C.dangerLight,  color: C.danger,  icon: AlertTriangle },
  "Actif":      { bg: C.successLight, color: C.success, icon: CheckCircle },
  "Inactif":    { bg: C.grayLight,    color: C.gray,    icon: XCircle },
  "VIP":        { bg: "#FFF7ED",      color: C.accent,  icon: Star },
  "Payé":       { bg: C.successLight, color: C.success, icon: CheckCircle },
  "Impayé":     { bg: C.warningLight, color: C.warning, icon: Clock },
  "Échoué":     { bg: C.dangerLight,  color: C.danger,  icon: XCircle },
};

export const StatusBadge = ({ status }) => {
  const s = statusMap[status] || { bg: C.grayLight, color: C.gray, icon: Info };
  return <Badge color={s.color} bg={s.bg} icon={s.icon}>{status}</Badge>;
};

// ─── KPICard ─────────────────────────────────────────────
export const KPICard = ({ label, value, sub, color = C.dark, icon: Icon }) => (
  <div style={{
    background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
    padding: "18px 20px", flex: 1, minWidth: 160,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
      {Icon && (
        <div style={{
          width: 28, height: 28, borderRadius: 7, background: `${color}14`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={14} color={color} />
        </div>
      )}
      <span style={{ fontSize: 11, color: C.gray, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
    </div>
    <div style={{ fontSize: 26, fontWeight: 700, color, lineHeight: 1.2 }}>{value}</div>
    {sub && (
      <div style={{ fontSize: 11, color: C.gray, marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
        {sub.startsWith("↑") ? <ArrowUpRight size={12} color={C.success} /> : sub.startsWith("↓") ? <ArrowDownRight size={12} color={C.danger} /> : null}
        {sub.replace(/^[↑↓]\s*/, "")}
      </div>
    )}
  </div>
);

// ─── Button ──────────────────────────────────────────────
export const Btn = ({ children, primary, accent, danger, outline, small, onClick, style: s, icon: Icon }) => {
  const pad = small ? "5px 10px" : "8px 16px";
  let bg = C.grayLight, color = C.dark;
  if (primary) { bg = C.primary; color = C.white; }
  if (accent)  { bg = C.accent;  color = C.white; }
  if (danger)  { bg = C.danger;  color = C.white; }
  if (outline) { bg = "transparent"; color = C.primary; }

  return (
    <button onClick={onClick} style={{
      border: outline ? `1.5px solid ${C.primary}` : "none",
      borderRadius: 6, cursor: "pointer", fontWeight: 600,
      fontSize: small ? 11 : 13, transition: "all 0.15s",
      display: "inline-flex", alignItems: "center", gap: 5,
      fontFamily: "inherit", background: bg, color, padding: pad, ...s,
    }}>
      {Icon && <Icon size={small ? 12 : 14} />}{children}
    </button>
  );
};

// ─── SearchInput ─────────────────────────────────────────
export const SearchInput = ({ placeholder, style: s }) => (
  <div style={{
    display: "flex", alignItems: "center", background: C.grayLight,
    borderRadius: 7, padding: "7px 12px", gap: 8, ...s,
  }}>
    <Search size={14} color={C.gray} />
    <input readOnly placeholder={placeholder} style={{
      border: "none", background: "transparent", outline: "none",
      fontSize: 13, color: C.dark, width: "100%", fontFamily: "inherit",
    }} />
  </div>
);

// ─── Select ──────────────────────────────────────────────
export const Select = ({ children }) => (
  <select style={{
    padding: "7px 12px", borderRadius: 7, border: `1px solid ${C.border}`,
    fontSize: 12, color: C.gray, fontFamily: "inherit", background: C.white,
  }}>
    <option>{children}</option>
  </select>
);

// ─── DataTable ───────────────────────────────────────────
export const DataTable = ({ headers, rows, onRowClick }) => (
  <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${C.border}` }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{
              background: "#F1F5F9", padding: "10px 12px", textAlign: "left",
              fontWeight: 600, color: C.dark, borderBottom: `1px solid ${C.border}`,
              whiteSpace: "nowrap", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.3,
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}
            onClick={() => onRowClick?.(ri)}
            style={{ cursor: onRowClick ? "pointer" : "default" }}
            onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {row.map((cell, ci) => (
              <td key={ci} style={{
                padding: "10px 12px", borderBottom: `1px solid ${C.border}`,
                color: C.dark, whiteSpace: "nowrap",
              }}>
                {typeof cell === "object" && cell?.type ? cell : <span>{cell}</span>}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Tabs ────────────────────────────────────────────────
export const Tabs = ({ tabs, active, onSelect }) => (
  <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${C.border}`, marginBottom: 16 }}>
    {tabs.map(t => (
      <button key={t.label} onClick={() => onSelect(t.label)} style={{
        padding: "8px 16px", fontSize: 12,
        fontWeight: active === t.label ? 700 : 500,
        color: active === t.label ? C.primary : C.gray,
        background: "none", border: "none", cursor: "pointer",
        borderBottom: active === t.label ? `2.5px solid ${C.primary}` : "2.5px solid transparent",
        marginBottom: -2, transition: "all 0.15s", fontFamily: "inherit",
      }}>
        {t.label}
        {t.count != null && (
          <span style={{
            background: active === t.label ? C.primaryLight : C.grayLight,
            color: active === t.label ? C.primary : C.gray,
            fontSize: 10, padding: "1px 6px", borderRadius: 10, marginLeft: 4, fontWeight: 600,
          }}>{t.count}</span>
        )}
      </button>
    ))}
  </div>
);

// ─── FormField ───────────────────────────────────────────
export const FormField = ({ label, value, placeholder, type }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{
      fontSize: 11, fontWeight: 600, color: C.gray, display: "block",
      marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.3,
    }}>{label}</label>
    {type === "select" ? (
      <select disabled style={{
        width: "100%", padding: "8px 10px", borderRadius: 6,
        border: `1px solid ${C.border}`, fontSize: 13, color: C.dark,
        background: C.white, fontFamily: "inherit",
      }}>
        <option>{value || placeholder}</option>
      </select>
    ) : (
      <input readOnly value={value} placeholder={placeholder} style={{
        width: "100%", padding: "8px 10px", borderRadius: 6,
        border: `1px solid ${C.border}`, fontSize: 13,
        color: value ? C.dark : C.gray, background: C.white,
        boxSizing: "border-box", fontFamily: "inherit",
      }} />
    )}
  </div>
);

// ─── PageHeader ──────────────────────────────────────────
export const PageHeader = ({ breadcrumb, title, children }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
    <div>
      <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>{breadcrumb}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
    </div>
    {children && <div style={{ display: "flex", gap: 8 }}>{children}</div>}
  </div>
);
