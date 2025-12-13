export interface Item {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  thumbnailUrl: string;
  imageUrls: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  symbol?: string;
}
