import React from 'react';
import { useNavigate } from 'react-router-dom';
import { theme as C } from '@/theme';
import { Btn } from '@/components/ui';
import { Search } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      background: C.white,
      textAlign: 'center'
    }}>
      <div style={{ 
        fontSize: 120, fontWeight: 900, color: '#F1F5F9', 
        lineHeight: 1, marginBottom: -20, userSelect: 'none'
      }}>
        404
      </div>
      <div style={{ 
        width: 48, height: 48, borderRadius: '50%', background: C.primaryLight,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, color: C.primary
      }}>
        <Search size={24} />
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: C.dark }}>
        Page non trouvée
      </h1>
      <p style={{ color: C.gray, maxWidth: 400, lineHeight: 1.6, marginBottom: 32 }}>
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
        Vérifiez l'URL ou utilisez le bouton ci-dessous.
      </p>
      <Btn primary onClick={() => navigate('/')}>
        Retour au Tableau de Bord
      </Btn>
    </div>
  );
}
