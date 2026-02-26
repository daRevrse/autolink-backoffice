import { Car, Lock } from "lucide-react";
import { theme as C } from "../theme";
import { Btn, FormField } from "../components/ui";

export default function LoginScreen({ onLogin }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100%",
      background: `linear-gradient(135deg, ${C.darkSidebar} 0%, #1E293B 100%)`,
    }}>
      <div style={{
        background: C.white, borderRadius: 16, width: 380,
        overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ background: C.primary, padding: "32px 24px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <Car size={32} color={C.white} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>
            Back Office
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.white, letterSpacing: -0.5 }}>
            AUTOLINK
          </div>
        </div>
        <div style={{ padding: "32px 28px" }}>
          <FormField label="Adresse email" placeholder="admin@autolink.tg" />
          <FormField label="Mot de passe" placeholder="••••••••••" />
          <div style={{ textAlign: "right", marginBottom: 20 }}>
            <a style={{ fontSize: 12, color: C.primary, textDecoration: "none", cursor: "pointer" }}>
              Mot de passe oublié ?
            </a>
          </div>
          <Btn primary icon={Lock} onClick={onLogin} style={{
            width: "100%", padding: "11px", justifyContent: "center",
            fontSize: 14, borderRadius: 8,
          }}>
            SE CONNECTER
          </Btn>
        </div>
      </div>
    </div>
  );
}
