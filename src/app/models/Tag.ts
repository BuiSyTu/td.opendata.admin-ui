import PaginationFilter from './PaginationFilter';

export interface Tag {
  id: string,
  name?: string,
  tenant?: string,
}

export interface TagListFilter extends PaginationFilter {
  
}