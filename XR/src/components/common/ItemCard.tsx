import { useNavigate } from 'react-router-dom';
import type { Item } from '../../types';
import { ROUTES } from '../../config/constants';
import './ItemCard.css';

interface ItemCardProps {
  item: Item;
  language?: 'en' | 'vn';
}

export function ItemCard({ item, language = 'en' }: ItemCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.ITEM_DETAIL.replace(':id', item.id));
  };

  const name = language === 'vn' ? item.nameVn : item.name;
  const description = language === 'vn' ? item.descriptionVn : item.description;

  return (
    <div className="item-card" onClick={handleClick}>
      <div className="item-card-image">
        <img src={item.thumbnailUrl} alt={name} />
        <div className="item-card-overlay">
          <span>Xem chi tiết</span>
        </div>
      </div>
      <div className="item-card-content">
        <h3 className="item-card-title">{name}</h3>
        <p className="item-card-description">{description}</p>
        {item.metadata && (
          <div className="item-card-metadata">
            {item.metadata.period && (
              <span className="metadata-tag">{item.metadata.period}</span>
            )}
            {item.metadata.material && (
              <span className="metadata-tag">{item.metadata.material}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
