import { CATEGORY_MAP } from '../models/category-map';

export function getCategoryName(categoryId: number): string {
  const category = CATEGORY_MAP.find(cat => cat.id === categoryId);
  return category ? category.name : 'Bilinmeyen Kategori';
}
