import { useState, useEffect } from 'react';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ItemCard } from '../../components/common/ItemCard';
import type { Item, Category } from '../../types';
import { itemsService } from '../../services/items.service';
import './Museum.css';

export function MuseumPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [language] = useState<'en' | 'vn'>('vn');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadItems();
  }, [selectedCategory]);

  const loadData = async () => {
    try {
      const categoriesData = await itemsService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadItems = async () => {
    setLoading(true);
    try {
      const itemsData = await itemsService.getItems(
        selectedCategory === 'all' ? undefined : selectedCategory,
      );
      setItems(itemsData);
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="museum-page">
        <section className="museum-header">
          <div className="museum-header-content">
            <h1 className="museum-title">
              {language === 'vn' ? 'Bảo Tàng Di Sản' : 'Heritage Museum'}
            </h1>
            <p className="museum-subtitle">
              {language === 'vn'
                ? 'Khám phá bộ sưu tập các vật phẩm văn hóa Việt Nam'
                : 'Explore the collection of Vietnamese cultural artifacts'}
            </p>
          </div>
        </section>

        <section className="museum-content">
          <div className="container">
            {/* Category Filter */}
            <div className="category-filter">
              <button
                className={`category-btn ${
                  selectedCategory === 'all' ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                {language === 'vn' ? 'Tất Cả' : 'All'}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${
                    selectedCategory === category.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {language === 'vn' ? category.nameVn : category.name}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>{language === 'vn' ? 'Đang tải...' : 'Loading...'}</p>
              </div>
            ) : items.length === 0 ? (
              <div className="empty-state">
                <p>
                  {language === 'vn'
                    ? 'Không tìm thấy vật phẩm nào'
                    : 'No items found'}
                </p>
              </div>
            ) : (
              <div className="items-grid">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} language={language} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
