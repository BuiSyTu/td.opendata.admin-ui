import PaginationFilter from './PaginationFilter';

export interface ProviderType {
  id: string,
  name?: string,
  description?: string,
  code?: string,
  isActive?: string,
  ternant?: string,
}

export interface ProviderTypeListFilter extends PaginationFilter {
  
}