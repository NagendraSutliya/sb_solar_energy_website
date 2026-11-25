import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans w-full max-w-full overflow-x-hidden">
      <TopBar />
      <Navbar />
      <main className="flex-grow min-w-0 max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
