# AutoLink Solutions — Back Office (Prototype)

Prototype interactif haute fidélité du back office AutoLink Solutions.
14 écrans navigables couvrant les sections 4.1 à 4.7, 4.10 et 4.14 du cahier des charges.

## Prérequis

- **Node.js** ≥ 18
- **npm** ≥ 9

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application s'ouvre automatiquement sur `http://localhost:3000`.

## Build production

```bash
npm run build
npm run preview
```

## Structure du projet

```
autolink-backoffice/
├── index.html                  # Point d'entrée HTML
├── package.json
├── vite.config.js              # Configuration Vite
├── src/
│   ├── main.jsx                # Bootstrap React
│   ├── index.css               # Styles globaux, scrollbar, reset
│   ├── App.jsx                 # Layout principal (sidebar + routing)
│   ├── theme.js                # Design tokens (couleurs)
│   ├── components/
│   │   └── ui.jsx              # Composants réutilisables
│   │                             Badge, StatusBadge, KPICard, Btn,
│   │                             SearchInput, Select, DataTable,
│   │                             Tabs, FormField, PageHeader
│   └── screens/
│       ├── LoginScreen.jsx     # BO-01 Connexion
│       ├── TwoFAScreen.jsx     # BO-02 Vérification 2FA
│       ├── DashboardScreen.jsx # BO-03 Tableau de bord
│       └── Screens.jsx         # BO-04 à BO-19
│                                 UsersScreen, DemandesScreen,
│                                 DetailDemandeScreen, ClientsScreen,
│                                 FicheClientScreen, VehiculesScreen,
│                                 CatalogueVenteScreen, PiecesScreen,
│                                 CommandesScreen, KanbanScreen,
│                                 PaiementsScreen, FacturesScreen,
│                                 SettingsScreen
```

## Écrans disponibles

| ID     | Écran                    | Section |
|--------|--------------------------|---------|
| BO-01  | Connexion                | 4.1     |
| BO-02  | Vérification 2FA         | 4.1     |
| BO-03  | Tableau de bord          | 4.2     |
| BO-04  | Utilisateurs internes    | 4.1     |
| BO-06  | Demandes clients (liste) | 4.3     |
| BO-07  | Détail demande           | 4.3     |
| BO-08  | Base de données clients  | 4.4     |
| BO-09  | Fiche client             | 4.4     |
| BO-10  | Véhicules clients        | 4.5     |
| BO-12  | Catalogue véhicules      | 4.6     |
| BO-14  | Pièces & Accessoires     | 4.6     |
| BO-15  | Commandes de pièces      | 4.7     |
| BO-16  | Pipeline ventes (Kanban) | 4.7     |
| BO-17  | Suivi des paiements      | 4.10    |
| BO-18  | Facturation              | 4.10    |
| BO-19  | Paramètres               | 4.14    |

## Navigation

- **Login** → cliquer "Se connecter" → **2FA** → cliquer "Vérifier" → **Dashboard**
- Sidebar gauche pour naviguer entre tous les écrans
- Cliquer sur une ligne dans Demandes → Détail demande
- Cliquer sur une ligne dans Clients → Fiche client
- Bouton **Déconnexion** en bas de la sidebar → retour au Login

## Stack technique

- **React 18** + **Vite 6**
- **lucide-react** pour les icônes SVG
- **DM Sans** (Google Fonts) pour la typographie
- CSS-in-JS (inline styles) — pas de dépendance CSS externe

## Design tokens

| Token        | Valeur    | Usage                   |
|-------------|-----------|-------------------------|
| primary     | `#1A73E8` | Actions, liens, accents |
| success     | `#10B981` | Statuts positifs        |
| warning     | `#F59E0B` | Alertes modérées        |
| danger      | `#EF4444` | Urgences, erreurs       |
| accent      | `#FF6B35` | CTA secondaires, VIP    |
| darkSidebar | `#0F172A` | Fond sidebar            |

---

**AutoLink Solutions** — Prototype Back Office v1.0
