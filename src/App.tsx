import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import IntentRules from "./pages/IntentRules";
import GroupManagement from "./pages/GroupManagement";
import CustomerRules from "./pages/CustomerRules";
import RequestHistory from "./pages/RequestHistory";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/intent-rules"
            element={
              <ProtectedRoute>
                <Layout>
                  <IntentRules />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/group-management"
            element={
              <ProtectedRoute>
                <Layout>
                  <GroupManagement />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-rules"
            element={
              <ProtectedRoute>
                <Layout>
                  <CustomerRules />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-history"
            element={
              <ProtectedRoute>
                <Layout>
                  <RequestHistory />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
