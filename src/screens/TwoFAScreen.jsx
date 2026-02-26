import { Shield, CheckCircle, Key } from "lucide-react";
import { theme as C } from "../theme";
import { Btn } from "../components/ui";

export default function TwoFAScreen({ onVerify }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100%",
      background: `linear-gradient(135deg, ${C.darkSidebar} 0%, #1E293B 100%)`,
    }}>
      <div style={{
        background: C.white, borderRadius: 16, width: 400,
        padding: "40px 32px", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: C.primaryLight,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Shield size={28} color={C.primary} />
          </div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Vérification 2FA</div>
        <div style={{ fontSize: 13, color: C.gray, marginBottom: 28 }}>
          Entrez le code à 6 chiffres de votre application d'authentification
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              width: 44, height: 52, border: `2px solid ${C.border}`,
              borderRadius: 8, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 22, fontWeight: 700, color: C.dark,
            }} />
          ))}
        </div>
        <Btn primary icon={CheckCircle} onClick={onVerify} style={{
          width: "100%", padding: "11px", justifyContent: "center",
          fontSize: 14, borderRadius: 8,
        }}>
          VÉRIFIER
        </Btn>
        <div style={{
          marginTop: 16, fontSize: 12, color: C.primary, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        }}>
          <Key size={12} /> Utiliser un code de secours
        </div>
      </div>
    </div>
  );
}
