import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import { ReactNode } from 'react';

export default function CasinoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-bet-bg">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
