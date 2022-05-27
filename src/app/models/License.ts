import PaginationFilter from './PaginationFilter';

export interface License {
  id: string,
  name?: string,
  description?: string,
  code?: string,
  isActive?: string,
  ternant?: string,
}

export interface LicenseListFilter extends PaginationFilter {
  
}