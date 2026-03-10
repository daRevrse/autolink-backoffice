import { mockDemandes } from '../mocks/data/demandes';
import { mockDelay } from '../mocks/handlers';

class DemandesService {
  async getAll() {
    await mockDelay();
    return mockDemandes;
  }

  async getById(id) {
    await mockDelay();
    return mockDemandes.find(d => d.id === id);
  }

  async updateStatut(id, status) {
    await mockDelay();
    const index = mockDemandes.findIndex(d => d.id === id);
    if (index !== -1) mockDemandes[index].status = status;
    return mockDemandes[index];
  }
}

export const demandesService = new DemandesService();
