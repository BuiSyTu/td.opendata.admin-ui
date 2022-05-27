import PaginationFilter from './PaginationFilter';

export interface DataType {
  id: string,
  name?: string,
  description?: string,
  code?: string,
  isActive?: string,
  ternant?: string,
}

export interface DataTypeListFilter extends PaginationFilter {
  
}