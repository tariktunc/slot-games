'use client';

import { useState, useEffect } from 'react';
import { useTokens } from '../../../contexts/TokenContext';
import styles from './SlotMachine.module.css';

const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'];
const REEL_COUNT = 10;
const SPIN_MS = 2000;
const STOP_MS = 800;

const initialReels = [
  Array(REEL_COUNT).fill('🍒'),
  Array(REEL_COUNT).fill('🍋'),
  Array(REEL_COUNT).fill('🍊'),
];

export default function SlotMachine() {
  const { tokens, spendTokens, addTokens } = useTokens();
  const [reels, setReels] = useState<string[][]>(initialReels);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [centerIndexes, setCenterIndexes] = useState([4, 4, 4]);
  const [message, setMessage] = useState('');
  const [won, setWon] = useState(false);
  const [bet, setBet] = useState(10);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const generateReel = () =>
    Array(REEL_COUNT).fill(null).map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);

  const spin = () => {
    if (isSpinning || isStopping || !spendTokens(bet)) return;

    setIsSpinning(true);
    setIsStopping(false);
    setMessage('');
    setWon(false);

    const newReels = [generateReel(), generateReel(), generateReel()];
    const newCenters = [0, 1, 2].map(() => Math.floor(Math.random() * REEL_COUNT));

    setTimeout(() => {
      setIsSpinning(false);
      setIsStopping(true);
      setReels(newReels);
      setCenterIndexes(newCenters);

      setTimeout(() => {
        setIsStopping(false);
        const centerSymbols = newReels.map((r, i) => r[newCenters[i]]);
        const hasWon = centerSymbols[0] === centerSymbols[1] && centerSymbols[1] === centerSymbols[2];
        const prize = bet * 5;
        setWon(hasWon);
        if (hasWon) {
          addTokens(prize);
          setMessage(`Büyük Kazanç! +${prize} token 🎉`);
        } else {
          setMessage('Şansını Tekrar Dene!');
        }
      }, STOP_MS);
    }, SPIN_MS);
  };

  if (!isClient) return <div className={styles.container}>Yükleniyor...</div>;

  const canSpin = !isSpinning && !isStopping && tokens >= bet;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Slotlar</h1>

      {/* Bet Selector */}
      <div className={styles.betRow}>
        <span className={styles.betLabel}>Bahis Miktarı:</span>
        {[10, 25, 50, 100].map(v => (
          <button
            key={v}
            onClick={() => setBet(v)}
            className={`${styles.betBtn} ${bet === v ? styles.betBtnActive : ''}`}
          >
            🪙 {v}
          </button>
        ))}
      </div>

      {/* Reels */}
      <div className={`${styles.slotMachine} ${isSpinning ? styles.spinning : ''} ${isStopping ? styles.stopping : ''}`}>
        {reels.map((reel, i) => (
          <div key={i} className={styles.reel}>
            <div className={styles.reelWindow}>
              <div className={styles.centerLine} />
              <div className={styles.symbolsContainer}>
                {reel.map((symbol, j) => (
                  <div
                    key={j}
                    className={`${styles.symbol} ${j === centerIndexes[i] ? styles.center : ''}`}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.spinButton} onClick={spin} disabled={!canSpin}>
        {isSpinning ? 'Döndürülüyor...' : `Döndür — ⬡${bet}`}
      </button>

      {message && (
        <div className={`${styles.message} ${won ? styles.win : ''}`}>
          {message}
        </div>
      )}
    </div>
  );
}
