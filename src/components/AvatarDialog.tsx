import { useState, useEffect } from 'react';
import './AvatarDialog.css';

interface AvatarDialogProps {
  onDialogComplete: () => void;
}

export const AvatarDialog = ({ onDialogComplete }: AvatarDialogProps) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const dialogLines = [
    { speaker: 'Luchi', text: 'Привет! У нас с тобой накопилось кое-что интересное...' },
    { speaker: 'Luchi', text: 'Наши инвентари! Хочешь посмотреть, что там лежит?' },
    { speaker: 'Luchi', text: 'Открой их по очереди. Сначала свой, потом мой — или наоборот.' },
    { speaker: 'Luchi', text: 'Я пока подожду.' },
  ];

  useEffect(() => {
    if (lineIndex === dialogLines.length) {
      const timer = setTimeout(() => {
        setVisible(false);
        onDialogComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, onDialogComplete]);

  const nextLine = () => {
    if (lineIndex < dialogLines.length) {
      setLineIndex(lineIndex + 1);
    }
  };

  if (!visible) return null;
  if (lineIndex >= dialogLines.length) return null;

  const current = dialogLines[lineIndex];
  const isLast = lineIndex === dialogLines.length - 1;

  return (
    <div className="pixel-dialog-overlay">
      <div className="pixel-stars"></div>
      <div className="moon"></div>
      <div className="ground"></div>
      <div className="campfire">
        <img src="icons/campfire.gif" alt="Campfire" className="campfire-gif" />
      </div>
      <div className="pixel-avatars">
  <div className="pixel-avatar friend">
    <span>Витенька</span>
    <img src="icons/friend-avatar.png" alt="Витя" />
  </div>
  <div className="pixel-avatar luchi">
    <span>Luchi</span>
    <img src="icons/luchi-avatar.png" alt="Luchi" />
  </div>
</div>
      <div className="pixel-dialog-box">
        <div className="dialog-speaker">{current.speaker}</div>
        <div className="dialog-text">{current.text}</div>
        <button className="dialog-next-pixel" onClick={nextLine}>
          {isLast ? 'Понятно! ' : '→ Далее'}
        </button>
      </div>
    </div>
  );
};