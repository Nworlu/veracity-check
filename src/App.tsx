// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Verify from "./pages/Verify";
import DashboardLayout from "./components/ui/DashboardLayout";
import UserDocumentPage from "./pages/dashboard/UserDocumentPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import AdminAllDocumentsPage from "./pages/dashboard/admin/AllDocumentPage";
import AdminAllUsersPage from "./pages/dashboard/admin/UserPage";
import DocumentDetailPage from "./pages/dashboard/DocumentDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <TooltipProvider> */}
    {/* <Toaster /> */}
    {/* <Sonner /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/verify" element={<Verify />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="documents" element={<UserDocumentPage />} />
          <Route path="document/:id" element={<DocumentDetailPage />} />
          <Route path="admin-documents" element={<AdminAllDocumentsPage />} />
          <Route path="admin-users" element={<AdminAllUsersPage />} />
          <Route path="profile" element={<ProfilePage />} />

        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    {/* </TooltipProvider> */}
  </QueryClientProvider>
);

export default App;
