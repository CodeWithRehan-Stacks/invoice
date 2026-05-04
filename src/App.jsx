import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

import Home from "./pages/Home";
// Dashboard Pages
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestRoute><Home /></GuestRoute>} />

      {/* Protected routes wrapped in Dashboard Layout */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/dashboard/create" element={<CreateInvoice />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}