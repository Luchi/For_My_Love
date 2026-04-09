import { useState, useRef } from 'react';
import './AddItemModal.css';

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (newItem: { icon: string; name: string; description: string }) => void;
}

export const AddItemModal = ({ onClose, onAdd }: AddItemModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение (PNG, JPG, GIF)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedIcon(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      alert('Пожалуйста, заполните название и описание');
      return;
    }
    onAdd({
      icon: selectedIcon || 'icons/empty.png', // если не выбрал — стандартная
      name: name.trim(),
      description: description.trim(),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>➕ Добавить свой предмет</h3>
        <div className="form-group">
          <label>Название предмета:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например: Волшебная флейта"
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>Описание (с эффектом):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Например: Играет мелодию радости. Эффект: +50 к настроению"
          />
        </div>
        <div className="form-group">
          <label>Иконка предмета (можно загрузить свою):</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ marginBottom: '8px' }}
          />
          {selectedIcon && (
            <div className="icon-preview">
              <span>Предпросмотр:</span>
              <img
                src={selectedIcon}
                alt="выбранная иконка"
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
            </div>
          )}
          <small style={{ opacity: 0.7, display: 'block', marginTop: '8px' }}>
            💡 Если не загрузить свою, будет использована иконка-заглушка.
            <br />
            ✨ Загруженная иконка сохранится только у тебя в браузере.
          </small>
        </div>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>✨ Добавить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};