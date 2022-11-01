import PaginationFilter from './PaginationFilter'

export interface Category {
    id: string
    name?: string
    description?: string
    code?: string
    isActive?: boolean
    imageUrl?: string
    icon?: string
    order?: number
    parentId?: string
    imageUrlResponse?: any
}

export interface CategoryListFilter extends PaginationFilter {}

export enum CategoryCode {
    GIAODUCDAOTAO = 'GIAODUCDAOTAO',
    YTE = 'YTE',
    LAODONGTHUONGBINHXAHOI = 'LAODONGTHUONGBINHXAHOI',
    CONGTHUONG = 'CONGTHUONG',
    NONGNGHIEP = 'NONGNGHIEP',
    GIAOTHONGVANTAI = 'GIAOTHONGVANTAI',
    THONGTINTRUYENTHONG = 'THONGTINTRUYENTHONG',
    NOIVU = 'NOIVU',
    VANHOATHETHAODULICH = 'VANHOATHETHAODULICH',
    KEHOACHDAUTU = 'KEHOACHDAUTU',
    TUPHAP = 'TUPHAP',
    BAOHIEM = 'BAOHIEM',
    TAICHINH = 'TAICHINH',
    KHOAHOCCONGNGHE = 'KHOAHOCCONGNGHE',
    XAYDUNG = 'XAYDUNG',
}
