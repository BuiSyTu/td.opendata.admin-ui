import PaginationFilter from './PaginationFilter';

export interface DocumentType {
  name?: string,
  description?: string,
}

export interface DocumentTypeListFilter extends PaginationFilter {
  
}