'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTokens } from '../../contexts/TokenContext';
import { useState } from 'react';

const NAV = [
  { href: '/', label: 'Casino' },
  { href: '/games/slot', label: 'Slotlar' },
  { href: '/games/roulette', label: 'Rulet' },
  { href: '/games/blackjack', label: 'Masa Oyunları' },
  { href: '/games/crash', label: 'Crash' },
];

export default function Header() {
  const pathname = usePathname();
  const { tokens, addTokens } = useTokens();
  const [showDeposit, setShowDeposit] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-14 flex items-center bg-bet-surface border-b border-bet-border px-4 lg:px-6 gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1 shrink-0 mr-2 lg:mr-6">
        <span className="font-black text-xl tracking-tight">
          <span className="text-bet-accent">BET</span>
          <span className="text-bet-text">VAULT</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-1 flex-1">
        {NAV.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                isActive
                  ? 'text-bet-text bg-bet-card'
                  : 'text-bet-muted hover:text-bet-text hover:bg-bet-card/50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right: Balance + Deposit */}
      <div className="ml-auto flex items-center gap-2">
        {/* Balance */}
        <div className="flex items-center gap-1.5 bg-bet-card border border-bet-border rounded px-3 py-1.5">
          <span className="text-bet-gold text-sm">⬡</span>
          <span className="text-bet-text font-bold text-sm tabular-nums">
            {tokens.toLocaleString('tr-TR')}
          </span>
          <span className="text-bet-muted text-xs hidden sm:block">TKN</span>
        </div>

        {/* Deposit Button */}
        <div className="relative">
          <button
            onClick={() => setShowDeposit(!showDeposit)}
            className="flex items-center gap-1.5 bg-bet-gold hover:bg-bet-gold-d text-black font-bold text-sm px-3 py-1.5 rounded transition-colors"
          >
            <span className="hidden sm:block">Para Yükle</span>
            <span className="sm:hidden">+</span>
          </button>
          {showDeposit && (
            <div className="absolute right-0 top-full mt-1 bg-bet-card border border-bet-border rounded-lg p-1.5 min-w-[160px] shadow-xl z-10">
              <p className="text-bet-muted text-xs px-2 py-1 mb-1">Token Satın Al</p>
              {[500, 1000, 2500, 5000].map(amt => (
                <button
                  key={amt}
                  onClick={() => { addTokens(amt); setShowDeposit(false); }}
                  className="w-full text-left flex items-center justify-between px-2 py-1.5 text-sm text-bet-text hover:bg-bet-elevated rounded transition-colors"
                >
                  <span>+ {amt.toLocaleString('tr-TR')}</span>
                  <span className="text-bet-accent text-xs font-semibold">TKN</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-bet-elevated border border-bet-border flex items-center justify-center text-sm cursor-pointer hover:border-bet-accent transition-colors">
          👤
        </div>
      </div>
    </header>
  );
}
