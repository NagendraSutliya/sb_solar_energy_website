import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import PortalLayout from './layouts/PortalLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';
import VendorRegistration from './pages/VendorRegistration';
import SbSolarProtection from './pages/SbSolarProtection';
import EmiSolarPlan from './pages/EmiSolarPlan';
import TypographyTest from './pages/TypographyTest';

// Portal & Admin Pages
import ComplaintLogin from './pages/complaints/Login';
import ComplaintRegister from './pages/complaints/Register';
import UserDashboard from './pages/complaints/UserDashboard';
import ComplaintForm from './pages/complaints/ComplaintForm';
import ComplaintHistory from './pages/complaints/ComplaintHistory';
import ComplaintDetails from './pages/complaints/ComplaintDetails';
import TicketDashboard from './pages/tickets/TicketDashboard';
import TicketForm from './pages/tickets/TicketForm';
import TicketChat from './pages/tickets/TicketChat';
import WhatsappAdmin from './pages/whatsapp/WhatsappAdmin';
import WhatsappLogs from './pages/whatsapp/WhatsappLogs';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import VendorManagement from './pages/admin/VendorManagement';
import SystemSettings from './pages/admin/SystemSettings';
import EnergyDashboard from './pages/energy/EnergyDashboard';
import { FaWhatsapp } from 'react-icons/fa';

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vendor-registration" element={<VendorRegistration />} />
          <Route path="/sb-solar-protection" element={<SbSolarProtection />} />
          <Route path="/emi-solar-plan" element={<EmiSolarPlan onOpenQuoteModal={() => window.dispatchEvent(new CustomEvent('open-solar-quote'))} />} />
          <Route path="/typography-test" element={<TypographyTest />} />
          <Route path="*" element={<Home />} />
        </Route>

        {/* Standalone Pages (No Navbar/Sidebar) */}
        <Route path="/portal/login" element={<ComplaintLogin />} />
        <Route path="/portal/register" element={<ComplaintRegister />} />
        
        {/* Protected Customer Portal Routes */}
        <Route element={<ProtectedRoute requiredRole="customer" />}>
          <Route path="/portal" element={<PortalLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            
            <Route path="support" element={<TicketDashboard />} />
            <Route path="support/new" element={<TicketForm />} />
            <Route path="support/chat/:id" element={<TicketChat />} />
            
            <Route path="energy" element={<EnergyDashboard />} />
            <Route path="complaints/new" element={<ComplaintForm />} />
            <Route path="complaints/history" element={<ComplaintHistory />} />
            <Route path="complaints/details/:id" element={<ComplaintDetails />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="whatsapp" element={<WhatsappAdmin />} />
            <Route path="whatsapp/logs" element={<WhatsappLogs />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="vendors" element={<VendorManagement />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>
        </Route>
      </Routes>

      {/* Floating WhatsApp Button (Global) */}
      <a
        href="https://wa.me/917023204664"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-6 md:bottom-10 md:right-5 z-[100] bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center group cursor-pointer"
      >
        <FaWhatsapp className="h-7 w-7 md:h-8 md:w-8" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg font-medium hidden md:block">
          Chat with us
        </span>
      </a>
    </Router>
  );
}

export default App;
