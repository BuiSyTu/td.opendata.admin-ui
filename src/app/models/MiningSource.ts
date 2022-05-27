import PaginationFilter from './PaginationFilter';

export interface MiningSource {
  id: string,
  name?: string,
  description?: string,
}

export interface MiningSourceListFilter extends PaginationFilter {
  
}