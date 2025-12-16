import type { Item, Category } from '../types';

// Mock data cho testing
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Vietnamese Art & Culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    name: 'Ceramics',
    description: 'Traditional Vietnamese ceramics',
  },
  {
    id: '3',
    name: 'Sculptures',
    description: 'Traditional Vietnamese sculptures',
  },
];

const mockItems: Item[] = [
  {
    id: '1',
    name: 'Dong Son Bronze Drum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    categoryId: '1',
    thumbnailUrl: 'https://placehold.co/200x200',
    imageUrls: [
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
    ],
  },
  {
    id: '2',
    name: 'Ceramic Vase',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    categoryId: '2',
    thumbnailUrl: 'https://placehold.co/200x200',
    imageUrls: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
  },
  {
    id: '3',
    name: 'Buddha Statue',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    categoryId: '3',
    thumbnailUrl: 'https://placehold.co/200x200',
    imageUrls: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
  },
];

class ItemsService {
  async getCategories(): Promise<Category[]> {
    return mockCategories;
  }

  async getItems(categoryId?: string): Promise<Item[]> {
    return mockItems.filter(
      (item) => !categoryId || item.categoryId === categoryId,
    );
  }

  async getItemById(id: string): Promise<Item> {
    const item = mockItems.find((item) => item.id === id);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }
}

export const itemsService = new ItemsService();
