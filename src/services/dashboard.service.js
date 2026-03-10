import { mockDelay } from '../mocks/handlers';

class DashboardService {
  async getStats() {
    await mockDelay(600);
    return {
      kpis: [
        { label: "Demandes", value: "89", sub: "↑ 12% vs mois dernier", color: "#6366F1" },
        { label: "Ventes", value: "2.4M", sub: "↑ 5.2% vs mois dernier", color: "#F59E0B" },
        { label: "Véhicules", value: "156", sub: "↑ 3 nouveaux", color: "#10B981" },
        { label: "Clients", value: "43", sub: "↑ 2 nouveaux", color: "#EC4899" },
      ],
      revenueData: [
        { name: 'Jan', value: 1200000 },
        { name: 'Feb', value: 2100000 },
        { name: 'Mar', value: 1800000 },
        { name: 'Apr', value: 2400000 },
        { name: 'May', value: 2000000 },
        { name: 'Jun', value: 2800000 },
      ],
      activityData: [
        { name: 'Lun', d: 12, e: 8 },
        { name: 'Mar', d: 19, e: 12 },
        { name: 'Mer', d: 15, e: 10 },
        { name: 'Jeu', d: 22, e: 15 },
        { name: 'Ven', d: 30, e: 20 },
        { name: 'Sam', d: 10, e: 5 },
      ]
    };
  }
}

export const dashboardService = new DashboardService();
