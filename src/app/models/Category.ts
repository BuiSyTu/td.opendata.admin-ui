export interface Category {
  id: string,
  name?: string,
  description?: string,
  code?: string,
  isActive?: boolean,
  imageUrl?: string,
  icon?: string,
  order?: number,
  parentId?: string,
}