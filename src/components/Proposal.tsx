import { useState, useEffect, useRef } from 'react';
import './Proposal.css';

interface ProposalProps {
  onAccept: () => void;
  visible: boolean;
  onChangeBackground: (type: 'firstotk' | 'secondotk' | 'default') => void;
}

export const Proposal = ({ onAccept, visible, onChangeBackground }: ProposalProps) => {
  const [refusalCount, setRefusalCount] = useState(0);
  const [isVisible, setIsVisible] = useState(visible);
  const timerRef = useRef<number | null>(null);

  // Синхронизируем внутреннюю видимость с внешней
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleDecline = () => {
    if (timerRef.current) return; // уже ждём

    if (refusalCount === 0) {
      onChangeBackground('firstotk');
      setIsVisible(false); // скрываем окно
      timerRef.current = window.setTimeout(() => {
        setRefusalCount(1);
        setIsVisible(true);
        timerRef.current = null;
      }, 700);
    } else if (refusalCount === 1) {
      onChangeBackground('secondotk');
      setIsVisible(false);
      timerRef.current = window.setTimeout(() => {
        setRefusalCount(2);
        setIsVisible(true);
        timerRef.current = null;
      }, 700);
    }
  };

  const getMessage = () => {
    if (refusalCount === 1) {
      return <p>Мне кажется ты слегка мисскликнул, так что думаешь на счет моего предложения?</p>;
    }
    if (refusalCount === 2) {
      return <p>Ладно, раз уж ты сам не можешь попасть по кнопке, то я тебе помогу, любовь моя❤.</p>;
    }
    return (
      <>
        <p>«Мы с тобой уже столько всего прошли, нам так хорошо вместе.»</p>
        <p>«А помнишь наши шутки про общий инвентарь? Так вот, я предлагаю сделать это по-настоящему — объединить наши инвентари прямо сейчас!»</p>
        <p>«Тогда откроются легендарные предметы, которые мы не могли получить по отдельности. Соглашайся, не бойся.»</p>
        <p className="proposal-question">Что скажешь, мой любимый тиммейт?</p>
      </>
    );
  };

  const getButtons = () => {
    if (refusalCount === 2) {
      return (
        <>
          <button className="accept-btn" onClick={onAccept}>💖 Принять 💖</button>
          <button className="accept-btn" onClick={onAccept}>💕 Принять 💕</button>
        </>
      );
    }
    return (
      <>
        <button className="accept-btn" onClick={onAccept}>🤝 Принять предложение</button>
        <button className="decline-btn" onClick={handleDecline}>❌ Отказаться</button>
      </>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="proposal-overlay">
      <div className="proposal-card">
        <div className="proposal-header">🎮 Поступило предложение от Luchi! 🎮</div>
        <div className="proposal-avatar">
          <img src="/icons/luchi-avatar.png" alt="Luchi" />
        </div>
        <div className="proposal-text">{getMessage()}</div>
        <div className="proposal-buttons">{getButtons()}</div>
      </div>
    </div>
  );
};