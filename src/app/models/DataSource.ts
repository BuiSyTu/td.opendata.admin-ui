import PaginationFilter from './PaginationFilter';

export interface DataSource {
  id: string,
  name?: string,
  description?: string,
}

export interface DataSourceListFilter extends PaginationFilter {
  
}