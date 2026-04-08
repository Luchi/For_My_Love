import { useState } from 'react';
import { InventoryColumn } from './InventoryColumn';
import './InventoryUnlocker.css';

interface InventoryUnlockerProps {
  hisItems: any[];
  herItems: any[];
  onBothViewed: () => void;
}

export const InventoryUnlocker = ({ hisItems, herItems, onBothViewed }: InventoryUnlockerProps) => {
  const [hisViewed, setHisViewed] = useState(false);
  const [herViewed, setHerViewed] = useState(false);
  const [modalOpen, setModalOpen] = useState<'his' | 'her' | null>(null);

  const openHis = () => setModalOpen('his');
  const openHer = () => setModalOpen('her');

  const closeModal = () => {
    if (modalOpen === 'his') setHisViewed(true);
    if (modalOpen === 'her') setHerViewed(true);
    setModalOpen(null);
  };

  const handleClose = () => {
    const wasHis = modalOpen === 'his';
    const wasHer = modalOpen === 'her';
    closeModal();
    // Если после закрытия оба просмотрены, вызываем колбэк
    if ((wasHis && herViewed) || (wasHer && hisViewed)) {
      onBothViewed();
    }
  };

  return (
  <div className="unlocker-container">
  <h2>Инвентари</h2>
  <div className="chests">
    <div className={`chest ${hisViewed ? 'viewed' : ''}`} onClick={openHis}>
      <div className="chest-icon">
        <img src="/icons/bag.png" alt="сундук" />
      </div>
      <p>Инвентарь Вити</p>
      {hisViewed && <span className="check">✓ Просмотрен</span>}
    </div>
    <div className={`chest ${herViewed ? 'viewed' : ''}`} onClick={openHer}>
      <div className="chest-icon">
        <img src="/icons/bag.png" alt="сундук" />
      </div>
      <p>Инвентарь Luchi</p>
      {herViewed && <span className="check">✓ Просмотрен</span>}
    </div>
  </div>


      {modalOpen === 'his' && (
        <div className="inventory-modal" onClick={handleClose}>
          <div className="inventory-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleClose}>✕</button>
            <InventoryColumn title="🎸 Инвентарь Вити" items={hisItems} />
          </div>
        </div>
      )}
      {modalOpen === 'her' && (
        <div className="inventory-modal" onClick={handleClose}>
          <div className="inventory-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleClose}>✕</button>
            <InventoryColumn title="💻 Инвентарь Luchi" items={herItems} />
          </div>
        </div>
      )}
    </div>
  );
};