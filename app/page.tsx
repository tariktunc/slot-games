import Link from 'next/link';
import GameCard from './components/lobby/GameCard';

const GAMES = [
  {
    href: '/games/slot',
    icon: '🎰',
    name: 'Slotlar',
    provider: 'BetVault Studios',
    rtp: '%96.5',
    badge: 'HOT',
    gradient: 'bg-gradient-to-br from-purple-900 via-purple-800 to-bet-bg',
  },
  {
    href: '/games/roulette',
    icon: '🎡',
    name: 'Avrupa Ruleti',
    provider: 'BetVault Live',
    rtp: '%97.3',
    gradient: 'bg-gradient-to-br from-emerald-900 via-green-900 to-bet-bg',
  },
  {
    href: '/games/blackjack',
    icon: '🃏',
    name: 'Blackjack Pro',
    provider: 'BetVault Studios',
    rtp: '%99.5',
    badge: 'YENİ',
    gradient: 'bg-gradient-to-br from-red-900 via-red-800 to-bet-bg',
  },
  {
    href: '/games/crash',
    icon: '🚀',
    name: 'Crash',
    provider: 'BetVault Originals',
    rtp: '%95.0',
    badge: 'YENİ',
    gradient: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-bet-bg',
  },
];

const RECENT_WINNERS = [
  { user: '🦊 Kerem_46',    game: 'Slotlar',   amount: 2450,  multi: '×24.5' },
  { user: '🐺 melisa_tr',   game: 'Crash',     amount: 1200,  multi: '×6.0' },
  { user: '🦁 AhmetB',      game: 'Blackjack', amount: 800,   multi: '×2.5' },
  { user: '🐯 sultan_90',   game: 'Rulet',     amount: 3200,  multi: '×16' },
  { user: '🦅 yusuf_bet',   game: 'Slotlar',   amount: 640,   multi: '×6.4' },
  { user: '🐻 Deniz_K',     game: 'Crash',     amount: 5000,  multi: '×25.0' },
];

const PROMOS = [
  { icon: '🎁', title: 'Hoş Geldin Bonusu', desc: 'İlk yüklemene %100 bonus', badge: '+1000 TKN' },
  { icon: '🔄', title: 'Haftalık Cashback', desc: 'Kayıplarının %15\'i geri', badge: '%15' },
  { icon: '👑', title: 'VIP Programı', desc: 'Özel avantajlar ve ödüller', badge: 'VIP' },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-bet-surface via-[#1a3a2a] to-bet-bg border border-bet-border">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #00e701 0%, transparent 60%)' }}
        />
        <div className="relative flex flex-col lg:flex-row items-center justify-between p-6 lg:p-10 gap-6">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-bet-accent/10 border border-bet-accent/20 rounded-full px-3 py-1 text-bet-accent text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-bet-accent animate-pulse" />
              CANLI · 1,248 Oyuncu Online
            </div>
            <h1 className="text-3xl lg:text-5xl font-black text-bet-text leading-tight mb-3">
              Türkiye'nin<br />
              <span className="text-bet-accent">En İyi</span> Casino
            </h1>
            <p className="text-bet-muted text-sm lg:text-base mb-6 max-w-md">
              Slotlar, Rulet, Blackjack ve Crash — hepsi tek platformda. Güvenli, eğlenceli, adil.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/games/slot"
                className="bg-bet-accent hover:bg-bet-accent-d text-black font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                Oynamaya Başla
              </Link>
              <Link
                href="/games/crash"
                className="bg-bet-card hover:bg-bet-elevated border border-bet-border text-bet-text font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                Crash Oyna
              </Link>
            </div>
          </div>

          {/* Decorative icons */}
          <div className="hidden lg:grid grid-cols-2 gap-4 text-5xl opacity-80">
            <span className="bg-bet-card border border-bet-border rounded-xl p-4 flex items-center justify-center">🎰</span>
            <span className="bg-bet-card border border-bet-border rounded-xl p-4 flex items-center justify-center">🚀</span>
            <span className="bg-bet-card border border-bet-border rounded-xl p-4 flex items-center justify-center">🃏</span>
            <span className="bg-bet-card border border-bet-border rounded-xl p-4 flex items-center justify-center">🎡</span>
          </div>
        </div>
      </div>

      {/* Promos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PROMOS.map(p => (
          <div key={p.title} className="flex items-center gap-3 bg-bet-card border border-bet-border rounded-xl p-4 hover:border-bet-border-l transition-colors cursor-pointer">
            <span className="text-3xl">{p.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-bet-text font-semibold text-sm truncate">{p.title}</p>
              <p className="text-bet-muted text-xs truncate">{p.desc}</p>
            </div>
            <span className="bg-bet-accent/10 text-bet-accent text-xs font-bold px-2 py-0.5 rounded shrink-0">
              {p.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Game Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-bet-text font-bold text-lg">🔥 Popüler Oyunlar</h2>
          <span className="text-bet-muted text-xs">{GAMES.length} oyun</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {GAMES.map(game => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </div>

      {/* Recent Winners */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-bet-text font-bold text-lg">🏆 Son Kazananlar</h2>
          <span className="flex items-center gap-1 text-bet-accent text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-bet-accent animate-pulse" />
            Canlı
          </span>
        </div>
        <div className="bg-bet-card border border-bet-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 text-bet-muted text-xs px-4 py-2 border-b border-bet-border bg-bet-surface">
            <span>Oyuncu</span>
            <span>Oyun</span>
            <span className="text-right">Kazanç</span>
          </div>
          {RECENT_WINNERS.map((w, i) => (
            <div
              key={i}
              className="grid grid-cols-3 px-4 py-2.5 text-sm border-b border-bet-border/50 last:border-0 hover:bg-bet-elevated/30 transition-colors"
            >
              <span className="text-bet-text font-medium truncate">{w.user}</span>
              <span className="text-bet-muted truncate">{w.game}</span>
              <div className="text-right">
                <span className="text-bet-accent font-bold">⬡{w.amount.toLocaleString('tr-TR')}</span>
                <span className="text-bet-muted text-xs ml-1">{w.multi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="flex items-start gap-3 p-4 bg-bet-surface border border-bet-border rounded-xl">
        <span className="text-bet-muted text-lg shrink-0">⚠</span>
        <p className="text-bet-muted text-xs leading-relaxed">
          BetVault tamamen eğlence amaçlıdır. Gerçek para, ödül veya kazanç içermez. 18 yaş ve üzeri kullanıcılara yöneliktir. Sorumlu oyun alışkanlıkları için lütfen sınırlarınızı bilin.
        </p>
      </div>

    </div>
  );
}
