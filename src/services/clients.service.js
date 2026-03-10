import { mockClients } from '../mocks/data/clients';
import { mockDelay } from '../mocks/handlers';

class ClientsService {
  async getAll() {
    await mockDelay();
    return mockClients;
  }

  async getById(id) {
    await mockDelay();
    return mockClients.find(c => c.id === parseInt(id));
  }

  async create(data) {
    await mockDelay();
    const newClient = { ...data, id: mockClients.length + 1 };
    mockClients.push(newClient);
    return newClient;
  }

  async update(id, data) {
    await mockDelay();
    const index = mockClients.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw new Error('Client non trouvé');
    mockClients[index] = { ...mockClients[index], ...data };
    return mockClients[index];
  }
}

export const clientsService = new ClientsService();
