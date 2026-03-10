import { mockDelay } from '../mocks/handlers';

export const mockCatalogue = [
  { id: 1, marque: "Toyota", modele: "Corolla", annee: 2023, prix: 12500000, etat: "Neuf", transmission: "Automatique", carburant: "Essence", description: "Toyota Corolla 2023 jamais roulée, toutes options." },
  { id: 2, marque: "Honda", modele: "CR-V", annee: 2021, prix: 15800000, etat: "Occasion", transmission: "Automatique", carburant: "Essence", description: "Honda CR-V 2021 en excellent état, carnet d'entretien à jour." },
];

class CatalogueService {
  async getAll() {
    await mockDelay();
    return mockCatalogue;
  }

  async getById(id) {
    await mockDelay();
    return mockCatalogue.find(i => i.id === parseInt(id));
  }

  async create(data) {
    await mockDelay();
    const newItem = { ...data, id: mockCatalogue.length + 1 };
    mockCatalogue.push(newItem);
    return newItem;
  }

  async update(id, data) {
    await mockDelay();
    const index = mockCatalogue.findIndex(i => i.id === parseInt(id));
    if (index === -1) throw new Error('Véhicule non trouvé');
    mockCatalogue[index] = { ...mockCatalogue[index], ...data };
    return mockCatalogue[index];
  }
}

export const catalogueService = new CatalogueService();
