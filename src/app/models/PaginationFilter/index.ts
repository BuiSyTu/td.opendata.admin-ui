import BaseFilter from './BaseFilter';

export default interface PaginationFilter extends BaseFilter {
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string[],
}