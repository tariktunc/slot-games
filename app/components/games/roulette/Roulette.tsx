'use client';

import { useState } from 'react';
import { useTokens } from '../../../contexts/TokenContext';
import styles from './Roulette.module.css';

type BetType = 'red' | 'black' | 'even' | 'odd' | 'low' | 'high';

const RED_NUMBERS = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

function spin(): number {
  return Math.floor(Math.random() * 37); // 0-36
}

function getColor(n: number): 'red' | 'black' | 'green' {
  if (n === 0) return 'green';
  return RED_NUMBERS.includes(n) ? 'red' : 'black';
}

function checkWin(result: number, bet: BetType): boolean {
  if (result === 0) return false;
  const color = getColor(result);
  switch (bet) {
    case 'red': return color === 'red';
    case 'black': return color === 'black';
    case 'even': return result % 2 === 0;
    case 'odd': return result % 2 !== 0;
    case 'low': return result >= 1 && result <= 18;
    case 'high': return result >= 19 && result <= 36;
  }
}

const BET_OPTIONS: { type: BetType; label: string; desc: string }[] = [
  { type: 'red', label: '🔴 Kırmızı', desc: '1:1' },
  { type: 'black', label: '⚫ Siyah', desc: '1:1' },
  { type: 'even', label: 'Çift', desc: '1:1' },
  { type: 'odd', label: 'Tek', desc: '1:1' },
  { type: 'low', label: '1-18', desc: '1:1' },
  { type: 'high', label: '19-36', desc: '1:1' },
];

export default function Roulette() {
  const { tokens, spendTokens, addTokens } = useTokens();
  const [selectedBet, setSelectedBet] = useState<BetType | null>(null);
  const [betAmount, setBetAmount] = useState(10);
  const [result, setResult] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [won, setWon] = useState(false);

  const handleSpin = () => {
    if (!selectedBet || isSpinning || !spendTokens(betAmount)) return;

    setIsSpinning(true);
    setMessage('');
    setResult(null);

    setTimeout(() => {
      const num = spin();
      const hasWon = checkWin(num, selectedBet);
      setResult(num);
      setIsSpinning(false);
      setWon(hasWon);

      if (hasWon) {
        addTokens(betAmount * 2);
        setMessage(`Kazandın! +${betAmount * 2} token 🎉  Sonuç: ${num}`);
      } else {
        setMessage(`Kaybettin. Sonuç: ${num} ${getColor(num) === 'green' ? '🟢' : getColor(num) === 'red' ? '🔴' : '⚫'} — Tekrar dene!`);
      }
    }, 2500);
  };

  const resultColor = result !== null ? getColor(result) : null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Avrupa Ruleti</h1>

      {/* Wheel Visual */}
      <div className={`${styles.wheelArea} ${isSpinning ? styles.spinning : ''}`}>
        <div className={styles.wheel}>
          {isSpinning ? (
            <span className={styles.wheelSpinner}>🎡</span>
          ) : result !== null ? (
            <div className={`${styles.resultDisplay} ${styles[`result_${resultColor}`]}`}>
              <span className={styles.resultNumber}>{result}</span>
              <span className={styles.resultColor}>
                {resultColor === 'green' ? '🟢' : resultColor === 'red' ? '🔴' : '⚫'}
              </span>
            </div>
          ) : (
            <span className={styles.wheelIdle}>🎡</span>
          )}
        </div>
        <div className={styles.wheelPointer}>▼</div>
      </div>

      {/* Bet Amount */}
      <div className={styles.betAmountRow}>
        <span className={styles.label}>Bahis:</span>
        {[10, 25, 50, 100].map(v => (
          <button
            key={v}
            onClick={() => setBetAmount(v)}
            className={`${styles.chipBtn} ${betAmount === v ? styles.chipActive : ''}`}
          >
            🪙 {v}
          </button>
        ))}
      </div>

      {/* Bet Type Grid */}
      <div className={styles.betGrid}>
        {BET_OPTIONS.map(opt => (
          <button
            key={opt.type}
            onClick={() => setSelectedBet(opt.type)}
            className={`${styles.betOption} ${selectedBet === opt.type ? styles.betOptionSelected : ''} ${
              opt.type === 'red' ? styles.betRed : opt.type === 'black' ? styles.betBlack : ''
            }`}
          >
            <span className={styles.betOptionLabel}>{opt.label}</span>
            <span className={styles.betOptionDesc}>{opt.desc}</span>
          </button>
        ))}
      </div>

      <button
        className={styles.spinButton}
        onClick={handleSpin}
        disabled={!selectedBet || isSpinning || tokens < betAmount}
      >
        {isSpinning ? 'Döndürülüyor...' : `Bahis Oyna — ⬡${betAmount}`}
      </button>

      {message && (
        <div className={`${styles.message} ${won ? styles.win : styles.lose}`}>
          {message}
        </div>
      )}
    </div>
  );
}
