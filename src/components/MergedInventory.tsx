import { useState, useEffect } from 'react';
import { InventoryItem } from './InventoryItem';
import { secretItems } from '../data/secretItems';
import { AddItemModal } from './AddItemModal';
import './MergedInventory.css';

const STORAGE_KEY = 'custom_items';

interface MergedInventoryProps {
  hisItems: any[];
  herItems: any[];
}

export const MergedInventory = ({ hisItems, herItems }: MergedInventoryProps) => {
  const [visibleSecretItems, setVisibleSecretItems] = useState<any[]>([]);
  const [customItems, setCustomItems] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Загрузка сохранённых предметов
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCustomItems(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customItems));
  }, [customItems]);

  // Постепенное появление секретных предметов (без дублей)
  useEffect(() => {
    const timeouts: number[] = [];
    secretItems.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setVisibleSecretItems(prev => [...prev, item]);
      }, index * 300);
      timeouts.push(timeout);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleAddItem = (newItem: any) => {
    setCustomItems(prev => [...prev, newItem]);
  };

  const handleDeleteItem = (indexToDelete: number) => {
    setCustomItems(prev => prev.filter((_, i) => i !== indexToDelete));
  };

const transformHerItems = () => {
  return herItems.flatMap(item => {
    if (item.name === 'Котя') {
      return [
        {
          icon: '/icons/Ocat.png',
          name: 'Наши коти',
          description: 'Мурчат, когда мы рядом. Эффект: +30 к теплу в сердце.'
        },
      ];
    }
    return item;
  });
};

const modifiedHerItems = transformHerItems();
const baseItems = [...hisItems, ...modifiedHerItems];
const allBaseItems = [...baseItems, ...visibleSecretItems];

  return (
    <div className="merged-inventory">
      <h2 className="merged-title">❣ Общий инвентарь (навсегда) ❣</h2>
      <div className="items-grid merged-grid">
        {/* Обычные предметы (без удаления) */}
        {allBaseItems.map((item, idx) => (
          <InventoryItem key={`base-${idx}`} {...item} />
        ))}
        {/* Кастомные предметы (с кнопкой удаления) */}
        {customItems.map((item, idx) => (
          <div key={`custom-${idx}`} className="custom-item-wrapper">
            <InventoryItem {...item} />
            <button
              className="delete-item-btn"
              onClick={() => handleDeleteItem(idx)}
              title="Удалить предмет"
            >
              🗑️
            </button>
          </div>
        ))}
        {/* Пустой слот для добавления */}
        <div className="empty-slot" onClick={() => setShowModal(true)}>
          <div className="empty-slot-icon">➕</div>
          <div className="empty-slot-text">Добавить свой предмет</div>
        </div>
      </div>
      <div className="congrats-message">
        <p>✨ Поздравляю! Теперь наши инвентари — единое целое. ✨</p>
        <p>С днём рождения, мой любимый❤️</p>
      </div>
      {showModal && (
        <AddItemModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddItem}
        />
      )}
    </div>
  );
};