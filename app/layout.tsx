import type { Metadata } from 'next';
import './globals.css';
import { TokenProvider } from './contexts/TokenContext';
import CasinoLayout from './components/layout/CasinoLayout';

export const metadata: Metadata = {
  title: 'BetVault — Online Casino & Bahis',
  description: 'Türkiye\'nin en iyi online casino deneyimi. Slotlar, Rulet, Blackjack, Crash.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TokenProvider>
          <CasinoLayout>{children}</CasinoLayout>
        </TokenProvider>
      </body>
    </html>
  );
}
