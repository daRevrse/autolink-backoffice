import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Screens & Pages
import LoginPage from "./pages/auth/LoginPage";
import TwoFAPage from "./pages/auth/TwoFAPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import UsersListPage from "./pages/users/UsersListPage";
import UserFormPage from "./pages/users/UserFormPage";
import DemandesListPage from "./pages/demandes/DemandesListPage";
import DemandeDetailPage from "./pages/demandes/DemandeDetailPage";
import ClientsListPage from "./pages/clients/ClientsListPage";
import ClientDetailPage from "./pages/clients/ClientDetailPage";
import VehiculesListPage from "./pages/vehicules/VehiculesListPage";
import VehiculeDetailPage from "./pages/vehicules/VehiculeDetailPage";
import VehiculeFormPage from "./pages/vehicules/VehiculeFormPage";
import CatalogueFormPage from "./pages/catalogue/CatalogueFormPage";
import CatalogueListPage from "./pages/catalogue/CatalogueListPage";
import KanbanPage from "./pages/pipeline/KanbanPage";
import ErrorBoundary from './components/common/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';
import {
  PiecesScreen, CommandesScreen,
  PaiementsScreen, FacturesScreen, SettingsScreen
} from "./screens/Screens";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Routes publiques (Auth) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify" element={<TwoFAPage />} />
        </Route>

        {/* Routes protégées */}
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          
          <Route path="users" element={<UsersListPage />} />
          <Route path="users/new" element={<UserFormPage />} />
          <Route path="users/:id/edit" element={<UserFormPage />} />
          
          <Route path="demandes" element={<DemandesListPage />} />
          <Route path="demandes/:id" element={<DemandeDetailPage />} />
          
          <Route path="clients" element={<ClientsListPage />} />
          <Route path="clients/:id" element={<ClientDetailPage />} />
          
          <Route path="vehicules" element={<VehiculesListPage />} />
          <Route path="vehicules/new" element={<VehiculeFormPage />} />
          <Route path="vehicules/:id/edit" element={<VehiculeFormPage />} />
          <Route path="vehicules/:id" element={<VehiculeDetailPage />} />
          
          <Route path="catalogue" element={<CatalogueListPage />} />
          <Route path="catalogue/new" element={<CatalogueFormPage />} />
          <Route path="catalogue/:id/edit" element={<CatalogueFormPage />} />
          
          <Route path="pieces" element={<PiecesScreen />} />
          <Route path="commandes" element={<CommandesScreen />} />
          <Route path="pipeline" element={<KanbanPage />} />
          <Route path="paiements" element={<PaiementsScreen />} />
          <Route path="factures" element={<FacturesScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>

        {/* 404 - Page dédiée */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
