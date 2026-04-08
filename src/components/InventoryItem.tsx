import { useState, useRef, useEffect } from 'react';
import './InventoryItem.css';

interface InventoryItemProps {
  icon: string;
  name: string;
  description: string;
}

export const InventoryItem = ({ icon, name, description }: InventoryItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>('top');
  const slotRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTooltip && slotRef.current && tooltipRef.current) {
      const slotRect = slotRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const spaceAbove = slotRect.top;
      const spaceBelow = window.innerHeight - slotRect.bottom;
      
      // Если сверху мало места, а снизу достаточно — показываем снизу
      if (spaceAbove < tooltipRect.height + 10 && spaceBelow > tooltipRect.height + 10) {
        setTooltipPosition('bottom');
      } else {
        setTooltipPosition('top');
      }
    }
  }, [showTooltip]);

  return (
    <div
      className="inventory-slot"
      ref={slotRef}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img src={icon} alt={name} className="item-icon" />
      <div className="item-name">{name}</div>
      {showTooltip && (
        <div
          ref={tooltipRef}
          className={`item-tooltip item-tooltip-${tooltipPosition}`}
        >
          {description}
        </div>
      )}
    </div>
  );
};