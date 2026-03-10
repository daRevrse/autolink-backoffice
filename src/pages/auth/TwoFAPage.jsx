import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Key } from "lucide-react";
import { theme as C } from '@/theme';
import { Btn } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/auth.service';
import { toast } from 'react-hot-toast';

export default function TwoFAPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  
  const { user, isVerifying2FA, verify2fa } = useAuthStore();

  useEffect(() => {
    // Rediriger si on n'est pas dans le flow d'auth
    if (!isVerifying2FA) {
      navigate('/login');
    }
  }, [isVerifying2FA, navigate]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e?.preventDefault();
    const finalCode = code.join('');
    if (finalCode.length < 6) {
      toast.error('Veuillez entrer le code complet');
      return;
    }

    setLoading(true);
    try {
      await authService.verify2fa(finalCode);
      verify2fa();
      toast.success('Bienvenue, ' + user.prenom);
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Code invalide');
    } finally {
      setLoading(false);
    }
  };

  // Auto-submit si 6 chiffres
  useEffect(() => {
    if (code.every(digit => digit !== '') && code.join('').length === 6) {
      handleVerify();
    }
  }, [code]);

  return (
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
        {code.map((digit, i) => (
          <input
            key={i}
            ref={el => inputs.current[i] = el}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            style={{
              width: 44, height: 52, border: `2px solid ${C.border}`,
              borderRadius: 8, textAlign: "center", fontSize: 22, 
              fontWeight: 700, color: C.dark, outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = C.primary}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        ))}
      </div>
      <Btn 
        primary 
        icon={CheckCircle} 
        onClick={handleVerify} 
        loading={loading}
        style={{
          width: "100%", padding: "11px", justifyContent: "center",
          fontSize: 14, borderRadius: 8,
        }}
      >
        VÉRIFIER
      </Btn>
      <div style={{
        marginTop: 16, fontSize: 12, color: C.primary, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
      }}>
        <Key size={12} /> Utiliser un code de secours
      </div>
    </div>
  );
}
