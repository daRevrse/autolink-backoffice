import { mockDelay } from '../mocks/handlers';

class AuthService {
  async login(email, password) {
    await mockDelay(1000);
    
    if (email === 'admin@autolink.tg' && password === 'password123') {
      return {
        user: {
          id: 1,
          nom: 'DIALLO',
          prenom: 'Amadou',
          email: 'amadou@autolink.tg',
          role: 'Administrateur',
          avatar: null
        },
        token: 'mock-jwt-token-12345'
      };
    }
    
    throw new Error('Identifiants invalides');
  }

  async verify2fa(code) {
    await mockDelay(800);
    
    if (code === '123456') {
      return true;
    }
    
    throw new Error('Code 2FA invalide');
  }

  async logout() {
    await mockDelay(300);
    return true;
  }
}

export const authService = new AuthService();
