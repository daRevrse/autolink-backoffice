import { mockVehicules } from '../mocks/data/vehicules';
import { mockDelay } from '../mocks/handlers';

class VehiculesService {
  async getAll() {
    await mockDelay();
    return mockVehicules;
  }

  async getById(id) {
    await mockDelay();
    return mockVehicules.find(v => v.id === parseInt(id));
  }

  async create(data) {
    await mockDelay();
    const newVehicule = { ...data, id: mockVehicules.length + 1 };
    mockVehicules.push(newVehicule);
    return newVehicule;
  }

  async update(id, data) {
    await mockDelay();
    const index = mockVehicules.findIndex(v => v.id === parseInt(id));
    if (index === -1) throw new Error('Véhicule non trouvé');
    mockVehicules[index] = { ...mockVehicules[index], ...data };
    return mockVehicules[index];
  }
}

export const vehiculesService = new VehiculesService();
