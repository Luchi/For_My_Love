import { useState } from 'react';
import './AddItemModal.css';

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (newItem: { icon: string; name: string; description: string }) => void;
}

export const AddItemModal = ({ onClose, onAdd }: AddItemModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('/icons/empty_slot.png');

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIcon(value);
  };

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      alert('Пожалуйста, заполните название и описание');
      return;
    }
    onAdd({
      icon: icon || '/icons/empty_slot.png',
      name: name.trim(),
      description: description.trim()
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Добавить новый предмет</h3>
        <div className="form-group">
          <label>Название предмета:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Например: Волшебная флейта" />
        </div>
        <div className="form-group">
          <label>Описание (с эффектом):</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Описание и эффект..." />
        </div>
        <div className="form-group">
          <label>Путь к иконке (можно оставить по умолчанию):</label>
          <input type="text" value={icon} onChange={handleIconChange} placeholder="/icons/my_custom_icon.png" />
        </div>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Добавить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};