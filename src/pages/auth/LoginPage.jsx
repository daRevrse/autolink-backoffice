import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Car, Lock } from "lucide-react";
import { theme as C } from '@/theme';
import { Btn, FormField } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/auth.service';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login, isAuthenticated, isVerifying2FA } = useAuthStore();
  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    } else if (isVerifying2FA) {
      navigate('/verify');
    }
  }, [isAuthenticated, isVerifying2FA, navigate]);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@autolink.tg',
      password: 'password123',
    }
  });

  const onSubmit = async (data) => {
    try {
      console.log('Attempting login for:', data.email);
      const result = await authService.login(data.email, data.password);
      login(result.user, result.token);
      toast.success('Connexion réussie, vérification 2FA requise');
      // Les useEffect s'occuperont de la redirection
    } catch (error) {
      toast.error(error.message || 'Une erreur est survenue');
    }
  };

  return (
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "32px 28px" }}>
        <FormField 
          label="Adresse email" 
          name="email"
          register={register}
          error={errors.email}
          placeholder="admin@autolink.tg" 
        />
        <FormField 
          label="Mot de passe" 
          type="password"
          name="password"
          register={register}
          error={errors.password}
          placeholder="••••••••••" 
        />
        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <a style={{ fontSize: 12, color: C.primary, textDecoration: "none", cursor: "pointer" }}>
            Mot de passe oublié ?
          </a>
        </div>
        <Btn 
          type="submit"
          primary 
          icon={Lock} 
          loading={isSubmitting}
          style={{
            width: "100%", padding: "11px", justifyContent: "center",
            fontSize: 14, borderRadius: 8,
          }}
        >
          SE CONNECTER
        </Btn>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <span 
            onClick={() => {
              useAuthStore.getState().logout();
              localStorage.clear();
              window.location.reload();
            }}
            style={{ fontSize: 11, color: C.gray, cursor: "pointer", textDecoration: "underline" }}
          >
            Problème de connexion ? Réinitialiser l'application
          </span>
        </div>
      </form>
    </div>
  );
}
