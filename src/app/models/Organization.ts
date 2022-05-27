import PaginationFilter from './PaginationFilter';

export interface Organization {
  id: string,
  name?: string,
  description?: string,
  code?: string,
  isActive?: string,
  ternant?: string,
}

export interface OrganizationListFilter extends PaginationFilter {
  
}