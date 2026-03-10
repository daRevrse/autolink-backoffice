import React from 'react';
import { theme as C } from '@/theme';
import { Btn } from '@/components/ui';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          background: '#F8FAFC',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: 64, height: 64, borderRadius: '50%', background: '#FEE2E2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24, color: C.danger
          }}>
            <AlertCircle size={32} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: C.dark }}>
            Oups ! Quelque chose s'est mal passé
          </h1>
          <p style={{ color: C.gray, maxWidth: 450, lineHeight: 1.6, marginBottom: 32 }}>
            Une erreur inattendue est survenue. Nous avons été informés et nous y travaillons. 
            Essayez de rafraîchir la page ou de revenir plus tard.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn outline icon={RefreshCw} onClick={() => window.location.reload()}>
              Rafraîchir la page
            </Btn>
            <Btn primary onClick={() => window.location.href = '/'}>
              Retour à l'accueil
            </Btn>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <pre style={{ 
              marginTop: 40, padding: 20, background: '#1E293B', color: '#FDA4AF', 
              borderRadius: 8, fontSize: 12, textAlign: 'left', maxWidth: '80%', overflow: 'auto'
            }}>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
