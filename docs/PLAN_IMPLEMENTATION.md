# AutoLink Back Office - Du Prototype au Frontend Fonctionnel

## Contexte

Le projet est un prototype React/Vite de back-office pour un garage automobile (AutoLink Solutions, Togo). 16 écrans statiques existent avec des données hardcodées, formulaires en lecture seule, et navigation par `useState`. L'objectif est de transformer ce prototype en un frontend fonctionnel prêt à se connecter à un backend Node.js + Express.

**Stack choisie:** react-router-dom, zustand, @tanstack/react-query, react-hook-form + zod, recharts, @dnd-kit, react-hot-toast, axios

---

## Nouvelle Structure de Fichiers

```
src/
  main.jsx                          # Bootstrap avec providers
  App.jsx                           # Configuration Router uniquement
  index.css                         # Styles globaux (inchangé)
  theme.js                          # Design tokens (étendu)

  components/
    ui/
      index.js                      # Barrel re-export
      Badge.jsx, StatusBadge.jsx, KPICard.jsx, Btn.jsx
      SearchInput.jsx               # Avec onChange, value
      Select.jsx                    # Avec options[], onChange
      DataTable.jsx                 # Avec tri, pagination, loading
      Tabs.jsx, FormField.jsx, PageHeader.jsx
      Modal.jsx                     # NOUVEAU: dialogues
      Spinner.jsx                   # NOUVEAU: loader
      EmptyState.jsx                # NOUVEAU: état vide
      Pagination.jsx                # NOUVEAU: contrôles de page
    layout/
      AppLayout.jsx                 # Sidebar + zone principale (extrait d'App.jsx)
      Sidebar.jsx                   # Menu nav (extrait d'App.jsx)
      AuthLayout.jsx                # Wrapper pages auth
      ProtectedRoute.jsx            # Guard d'authentification
    ErrorBoundary.jsx

  hooks/
    useDebounce.js

  lib/
    api.js                          # Instance axios + intercepteurs
    formatters.js                   # formatFCFA(), formatDate()
    constants.js                    # Rôles, statuts, priorités
    validators.js                   # Schémas zod partagés

  services/
    auth.service.js
    users.service.js, demandes.service.js, clients.service.js
    vehicules.service.js, catalogue.service.js, pieces.service.js
    commandes.service.js, pipeline.service.js
    paiements.service.js, factures.service.js
    settings.service.js, dashboard.service.js

  mocks/
    data/                           # 12 fichiers de données mock
    handlers.js                     # mockDelay + logique de réponse

  stores/
    authStore.js                    # user, token, isAuthenticated
    uiStore.js                      # sidebar, modals

  pages/
    auth/          LoginPage.jsx, TwoFAPage.jsx
    dashboard/     DashboardPage.jsx
    users/         UsersListPage.jsx, UserFormPage.jsx (BO-05 NOUVEAU)
    demandes/      DemandesListPage.jsx, DemandeDetailPage.jsx
    clients/       ClientsListPage.jsx, ClientDetailPage.jsx
    vehicules/     VehiculesListPage.jsx, VehiculeDetailPage.jsx (BO-11 NOUVEAU)
    catalogue/     CatalogueListPage.jsx, CatalogueFormPage.jsx (BO-13 NOUVEAU)
    pieces/        PiecesListPage.jsx
    commandes/     CommandesListPage.jsx
    pipeline/      PipelinePage.jsx, KanbanBoard.jsx, KanbanColumn.jsx, KanbanCard.jsx
    paiements/     PaiementsPage.jsx
    factures/      FacturesPage.jsx
    settings/      SettingsPage.jsx
    NotFoundPage.jsx
```

**Migration incrémentale:** `src/screens/` et `src/components/ui.jsx` coexistent avec les nouveaux fichiers via des re-exports. Suppression finale en Phase 7.

---

## Phase 1: Fondation - Routing, Layout, Scaffolding

**Objectif:** Remplacer la navigation useState par react-router-dom. Extraire le layout. Installer toutes les dépendances. L'app est visuellement identique mais avec de vraies URLs.

**Actions:**
1. `npm install react-router-dom zustand @tanstack/react-query react-hook-form zod @hookform/resolvers recharts @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities react-hot-toast axios`
2. Configurer alias `@` → `src/` dans `vite.config.js`
3. Créer `components/layout/AppLayout.jsx` - Extraire sidebar + main d'App.jsx, utiliser `<Outlet />`
4. Créer `components/layout/Sidebar.jsx` - Nav menu avec `<NavLink>`, logo, user footer
5. Créer `components/layout/AuthLayout.jsx` - Wrapper gradient pour login/2FA
6. Créer `components/layout/ProtectedRoute.jsx` - Guard (hardcodé `true` d'abord)
7. Réécrire `App.jsx` avec `<BrowserRouter>` et toutes les routes
8. Mettre à jour `main.jsx` avec `<QueryClientProvider>` et `<Toaster />`
9. Adapter les écrans existants: remplacer `onLogin`, `onVerify`, `onBack`, `onSelect` par `useNavigate()`

**Routes:**
```
/login → LoginScreen       /verify → TwoFAScreen
/ → Dashboard              /users → UsersScreen         /users/new → UserFormPage
/users/:id/edit → UserFormPage    /demandes → DemandesScreen
/demandes/:id → DetailDemandeScreen    /clients → ClientsScreen
/clients/:id → FicheClientScreen       /vehicules → VehiculesScreen
/vehicules/:id → VehiculeDetailPage    /catalogue → CatalogueVenteScreen
/catalogue/new → CatalogueFormPage     /catalogue/:id/edit → CatalogueFormPage
/pieces → PiecesScreen     /commandes → CommandesScreen
/pipeline → KanbanScreen   /paiements → PaiementsScreen
/factures → FacturesScreen /settings → SettingsScreen
```

**Fichiers modifiés:** `package.json`, `vite.config.js`, `main.jsx`, `App.jsx`, `LoginScreen.jsx`, `TwoFAScreen.jsx`, `Screens.jsx`
**Fichiers créés:** 4 fichiers layout

---

## Phase 2: Composants UI Améliorés et Couche de Données Mock

**Objectif:** Éclater `ui.jsx` en fichiers individuels, rendre les composants interactifs, créer la couche mock data + services.

**2A - Split et amélioration UI:**
- Éclater `ui.jsx` en 10 fichiers individuels + `index.js` barrel
- Créer 4 nouveaux composants: `Modal`, `Spinner`, `EmptyState`, `Pagination`
- `SearchInput`: supprimer `readOnly`, ajouter `value`/`onChange`
- `Select`: accepter `options[]`, `value`, `onChange` au lieu d'un seul `<option>`
- `DataTable`: ajouter props `isLoading`, `emptyMessage`, accepter `columns` + `data` (au lieu de `rows` JSX)
- `FormField`: ajouter `name`, `register`, `error` pour react-hook-form (rétrocompatible)
- `Btn`: ajouter `type="submit"`, `disabled`, `loading`

**2B - Mock data et services:**
- `lib/api.js` - Instance axios avec baseURL, intercepteurs
- `lib/formatters.js` - `formatFCFA(amount)`, `formatDate(iso)`, `formatDateTime(iso)`
- `lib/constants.js` - Enums: rôles, statuts, priorités, modes de paiement
- `mocks/data/*.js` - 12 fichiers: extraire les données hardcodées de Screens.jsx en objets JS structurés
- `mocks/handlers.js` - `mockDelay(ms)` + logique CRUD en mémoire
- `services/*.service.js` - 13 fichiers: chaque service exporte `getAll()`, `getById()`, `create()`, `update()`, `delete()` qui appellent les mock handlers
- `hooks/useDebounce.js`

**Fichiers source des données mock (extraire de Screens.jsx):**
- `users.js` ← UsersScreen rows (5 utilisateurs)
- `demandes.js` ← DemandesScreen rows (5 demandes)
- `clients.js` ← ClientsScreen rows (5 clients)
- `vehicules.js` ← VehiculesScreen rows (4 véhicules)
- `catalogue.js` ← CatalogueVenteScreen rows (4 véhicules vente)
- `pieces.js` ← PiecesScreen rows (5 pièces)
- `commandes.js` ← CommandesScreen rows (4 commandes)
- `pipeline.js` ← KanbanScreen columns (5 colonnes + cartes)
- `paiements.js` ← PaiementsScreen rows (4 paiements)
- `factures.js` ← FacturesScreen rows (3 factures)
- `dashboard.js` ← DashboardScreen KPIs et données graphiques
- `settings.js` ← SettingsScreen champs

---

## Phase 3: Authentification et State Management

**Objectif:** Login/2FA fonctionnels avec mock credentials, stores Zustand, guard de route.

**Actions:**
1. `stores/authStore.js` - Zustand: `{user, token, isAuthenticated, login(), verify2fa(), logout()}`
2. `stores/uiStore.js` - Zustand: `{sidebarCollapsed, activeModal, toggleSidebar(), openModal(), closeModal()}`
3. `services/auth.service.js` - Mock: accepte `admin@autolink.tg` / `password123`
4. `pages/auth/LoginPage.jsx` - react-hook-form + zod, inputs fonctionnels, toast erreurs, loading
5. `pages/auth/TwoFAPage.jsx` - 6 inputs auto-focus, vérification automatique au 6e chiffre
6. Brancher `ProtectedRoute` sur `authStore.isAuthenticated`
7. `Sidebar.jsx` affiche l'utilisateur connecté depuis authStore

**Vérification:** Login `admin@autolink.tg`/`password123` → 2FA → Dashboard. Mauvais credentials = toast erreur. Refresh sur route protégée = redirect login. Logout fonctionne.

---

## Phase 4: Écrans Liste avec TanStack Query (phase la plus large)

**Objectif:** Migrer tous les écrans liste vers les pages avec useQuery, recherche/filtres/tabs/pagination fonctionnels.

**4A - Dashboard (BO-03):** useQuery pour KPIs, recharts `<BarChart>` et `<PieChart>` (remplacent les charts CSS), table d'alertes, loading skeletons

**4B - Users (BO-04):** useQuery avec filtres, SearchInput avec useDebounce, Select fonctionnel pour rôle/statut, DataTable avec données structurées, Pagination, boutons edit/delete avec navigation/mutation

**4C - Demandes (BO-06 + BO-07):** Tabs filtre par statut avec compteurs calculés, recherche + filtres type/priorité, row click → `/demandes/:id`, Détail: actions (Accepter/Attribuer/Suspendre) = useMutation

**4D - Clients (BO-08 + BO-09):** Liste avec recherche/filtres, Fiche client avec onglets (Informations, Véhicules, Services, Transactions, Notes)

**4E - Véhicules (BO-10), Catalogue (BO-12), Pièces (BO-14), Commandes (BO-15):** Même pattern: useQuery, recherche, filtres, pagination. Chacun dans son propre fichier page.

**4F - Paiements (BO-17) + Factures (BO-18):** KPI cards + liste avec filtres. Aperçu facture.

**4G - Settings (BO-19):** Tabs, onglet Entreprise fonctionnel avec react-hook-form, sauvegarde via useMutation.

**Après cette phase:** Supprimer `src/screens/Screens.jsx` et `src/screens/DashboardScreen.jsx`.

---

## Phase 5: Formulaires, Mutations et 3 Écrans Manquants

**Objectif:** Formulaires create/edit avec react-hook-form + zod. 3 écrans manquants. Mutations CRUD complètes.

**5A - BO-05 NOUVEAU: `pages/users/UserFormPage.jsx`**
- Route `/users/new` (création) et `/users/:id/edit` (édition)
- Zod: nom, prenom, email, telephone (+228), rôle, mot de passe (create only)
- Matrice de permissions par module (checkbox grid)
- Submit → useMutation → toast succès → navigate `/users`

**5B - BO-11 NOUVEAU: `pages/vehicules/VehiculeDetailPage.jsx`**
- Route `/vehicules/:id`
- Header: marque modèle année, immatriculation, statut
- KPI cards: km, dernier service, prochain entretien, propriétaire
- Onglets: Infos (FormFields), Interventions (DataTable), Pièces changées (DataTable), Documents
- Mode édition toggle

**5C - BO-13 NOUVEAU: `pages/catalogue/CatalogueFormPage.jsx`**
- Route `/catalogue/new` et `/catalogue/:id/edit`
- Zod: marque, modele, annee, etat, prix, km, stock, visible, carburant, transmission, couleur
- Zone upload images (aperçu uniquement, pas d'upload réel)
- Boutons: Enregistrer, Enregistrer & Publier, Annuler

**5D - Mutations sur toutes les listes:**
- Boutons Edit → navigation vers formulaire
- Boutons Delete → Modal confirmation → useMutation → invalidate cache → toast
- Actions Demande (Accepter/Suspendre/Annuler) → mutations statut
- Actions Commandes (Préparer/Expédier/Relancer)

---

## Phase 6: Kanban Drag-and-Drop et Interactions Avancées

**Objectif:** Pipeline ventes avec @dnd-kit fonctionnel. Charts interactifs. Onglets client complets.

**6A - Kanban (BO-16):**
- `DndContext` + `SortableContext` + `useDroppable`/`useSortable`
- Drag-and-drop entre colonnes = mutation statut
- Optimistic update + rollback on error
- Visuel: opacité pendant le drag, highlight colonne cible
- Composants: `KanbanBoard.jsx`, `KanbanColumn.jsx`, `KanbanCard.jsx`

**6B - Toggle vue:** Kanban / Tableau / Calendrier

**6C - Dashboard charts:** Tooltips recharts, animation au mount, clic segment pie = filtre

**6D - Client detail complet:** Tous les onglets fonctionnels avec données

**6E - Factures:** Aperçu PDF, boutons télécharger/envoyer

---

## Phase 7: Polish et Production Readiness

**Objectif:** Error handling, loading states partout, 404, accessibilité, préparation API réelle.

- `ErrorBoundary.jsx` - Catch erreurs React
- `NotFoundPage.jsx` - Page 404
- TanStack Query global error handler → toast
- API intercepteurs: 401 = logout, 403 = toast access denied
- Skeletons loading sur toutes les pages
- `.env.development` (`VITE_USE_MOCKS=true`) et `.env.production` (`VITE_API_URL=...`)
- Toggle mock/réel dans chaque service
- Modal: focus trap, Escape to close
- Suppression `src/screens/`, `src/components/ui.jsx` (monolithe)
- Mise à jour imports vers alias `@/`
- Mise à jour README.md

---

## Vérification End-to-End

1. **Auth:** Login → 2FA → Dashboard. Mauvais creds = erreur. Refresh = redirect login.
2. **Navigation:** Toutes les URLs fonctionnent. Browser back/forward. Sidebar active state.
3. **CRUD:** Créer/Modifier/Supprimer un utilisateur, véhicule catalogue, etc.
4. **Recherche/Filtres:** Taper dans SearchInput filtre en temps réel. Combiner filtres.
5. **Pagination:** Naviguer entre pages. Compteurs corrects.
6. **Kanban:** Drag-drop entre colonnes. Card click ouvre détail.
7. **Formulaires:** Validation inline (zod). Soumission avec loading. Toast succès/erreur.
8. **Charts:** Tooltips, animation, données du service.
9. **Build:** `npm run build` sans erreur.

---

## Fichiers Critiques

| Fichier | Rôle | Phases |
|---------|------|--------|
| `src/App.jsx` | Router principal | 1, 4, 5 |
| `src/screens/Screens.jsx` | Source données mock + composants à migrer | 2, 4 |
| `src/components/ui.jsx` → `ui/index.js` | Lib UI à éclater et améliorer | 2 |
| `src/theme.js` | Design tokens à étendre | 2 |
| `src/screens/DashboardScreen.jsx` | Charts à remplacer par recharts | 4 |
