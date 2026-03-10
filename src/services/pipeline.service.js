import { mockDelay } from '../mocks/handlers';

export const COLUMNS = [
  { id: 'lead', title: 'Leads' },
  { id: 'contact', title: 'Contactés' },
  { id: 'quote', title: 'Devis Envoyés' },
  { id: 'vendu', title: 'Vendus' },
  { id: 'perdu', title: 'Perdus' }
];

const INITIAL_DATA = [
  { id: '1', title: 'Toyota RAV4 2022', client: 'M. Kouassi', amount: 15400000, columnId: 'lead', priority: 'Moyen' },
  { id: '2', title: 'Honda CR-V 2021', client: 'Mme Mensah', amount: 18200000, columnId: 'contact', priority: 'Haut' },
  { id: '3', title: 'Mercedes C300', client: 'Dr. Lawson', amount: 24500000, columnId: 'quote', priority: 'Haut' },
  { id: '4', title: 'Suzuki Vitara', client: 'M. Amadou', amount: 12000000, columnId: 'vendu', priority: 'Moyen' },
  { id: '5', title: 'Hyundai Tucson', client: 'Mme Yao', amount: 16500000, columnId: 'perdu', priority: 'Bas' },
  { id: '6', title: 'Kia Sportage', client: 'M. Koffi', amount: 14800000, columnId: 'lead', priority: 'Moyen' },
];

class PipelineService {
  constructor() {
    this.data = [...INITIAL_DATA];
  }

  async getAll() {
    await mockDelay(400);
    return this.data;
  }

  async moveCard(cardId, targetColumnId) {
    await mockDelay(200);
    const index = this.data.findIndex(c => c.id === cardId);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], columnId: targetColumnId };
    }
    return this.data;
  }

  async create(card) {
    await mockDelay(300);
    const newCard = { ...card, id: Math.random().toString(36).substr(2, 9) };
    this.data.push(newCard);
    return newCard;
  }
}

export const pipelineService = new PipelineService();
