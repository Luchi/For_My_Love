import { InventoryItem } from './InventoryItem';
import './InventoryColumn.css';

interface InventoryColumnProps {
  title: string;
  items: {
    icon: string;
    name: string;
    description: string;
  }[];
}

export const InventoryColumn = ({ title, items }: InventoryColumnProps) => {
  return (
    <div className="inventory-column">
      <h2 className="column-title">{title}</h2>
      <div className="items-grid">
        {items.map((item, idx) => (
          <InventoryItem
            key={idx}
            icon={item.icon}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};