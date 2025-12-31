import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';
import FloatingCartButton from './FloatingCartButton';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative noise-overlay">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Cart />
      <FloatingCartButton />
    </div>
  );
}
