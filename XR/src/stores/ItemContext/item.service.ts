import axios from 'axios';

import type { AssetsItem, Category, Item } from '@/shared/api';

class ItemService {
  async getItems(): Promise<Item[]> {
    const response = await axios.get<Item[]>('/api/museum-public/items');
    return response.data as Item[];
  }
  async getCategories(): Promise<Category[]> {
    const response = await axios.get<Category[]>(
      '/api/museum-public/categories',
    );
    return response.data as Category[];
  }
  async getAssetsItems(): Promise<AssetsItem[]> {
    const response = await axios.get<AssetsItem[]>(
      '/api/museum-public/assets-items',
    );
    return response.data as AssetsItem[];
  }
}

export default new ItemService();
