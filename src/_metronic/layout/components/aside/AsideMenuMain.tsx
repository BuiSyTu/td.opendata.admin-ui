/* eslint-disable react/jsx-no-target-blank */
// import { useSelector } from 'react-redux'

import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { useIntl } from 'react-intl'

export function AsideMenuMain() {
  const intl = useIntl()
  // const user: any = useSelector<any>((state) => state.auth.user)
  // const userRoles = user?.roles ?? []

  // const CheckRole: any = (roles: Array<string>, role: Array<string>) => {
  //   return roles.some((v: any) => role.includes(v))
  // }

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
      />

      <AsideMenuItemWithSub
        to='/dataset'
        title='Tập dữ liệu'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub
          to='/dataset/webapi'
          title='Web api'
          hasBullet={true}
        >
          <AsideMenuItem to='/dataset/webapi/list' title='Danh sách' hasBullet={true} />
          <AsideMenuItem to='/dataset/webapi/config' title='Cấu hình' hasBullet={true} />
          <AsideMenuItem to='/dataset/webapi/sync-history' title='Lịch sử đồng bộ' hasBullet={true} />
          <AsideMenuItem to='/dataset/webapi/statistic' title='Thống kê' hasBullet={true} />
        </AsideMenuItemWithSub>
        <AsideMenuItemWithSub
          to='/dataset/excel'
          title='File'
          fontIcon='bi-archive'
          hasBullet={true}
        >
          <AsideMenuItem to='/dataset/excel/list' title='Danh sách' hasBullet={true} />
          <AsideMenuItem to='/dataset/excel/config' title='Cấu hình' hasBullet={true} />
          <AsideMenuItem to='/dataset/excel/sync-history' title='Lịch sử đồng bộ' hasBullet={true} />
          <AsideMenuItem to='/dataset/excel/statistic' title='Thống kê' hasBullet={true} />
        </AsideMenuItemWithSub>
        <AsideMenuItemWithSub
          to='/dataset/database'
          title='Database'
          fontIcon='bi-archive'
          hasBullet={true}
        >
          <AsideMenuItem to='/dataset/database/list' title='Danh sách' hasBullet={true} />
          <AsideMenuItem to='/dataset/database/config' title='Cấu hình' hasBullet={true} />
          <AsideMenuItem to='/dataset/database/sync-history' title='Lịch sử đồng bộ' hasBullet={true} />
          <AsideMenuItem to='/dataset/database/statistic' title='Thống kê' hasBullet={true} />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub
          to='/dataset/collect'
          title='Thu thập'
          fontIcon='bi-archive'
          hasBullet={true}
        >
          <AsideMenuItem to='/dataset/collect/list' title='Danh sách' hasBullet={true} />
          <AsideMenuItem to='/dataset/collect/config' title='Theo lĩnh vực' hasBullet={true} />
          <AsideMenuItem to='/dataset/collect/sync-history' title='Theo hình thức thu thập' hasBullet={true} />
          <AsideMenuItem to='/dataset/collect/statistic' title='Theo trạng thái' hasBullet={true} />
          <AsideMenuItem to='/dataset/collect/statistic' title='Theo đơn vị cung cấp' hasBullet={true} />
          <AsideMenuItem to='/dataset/collect/statistic' title='Theo loại hình thu thập' hasBullet={true} />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub
          to='/dataset/approve'
          title='Duyệt dữ liệu'
          fontIcon='bi-archive'
          hasBullet={true}
        >
          <AsideMenuItem to='/dataset/approve/pending' title='Đang chờ' hasBullet={true} />
          <AsideMenuItem to='/dataset/approve/rejected' title='Không duyệt' hasBullet={true} />
          <AsideMenuItem to='/dataset/approve/approved' title='Đã duyệt' hasBullet={true} />
          <AsideMenuItem to='/dataset/approve/statistic-by-category' title='Thống kê theo lĩnh vực' hasBullet={true} />
          <AsideMenuItem to='/dataset/approve/statistic-by-organization' title='Thống kê theo đơn vị cung cấp' hasBullet={true} />
          <AsideMenuItem to='/dataset/approve/statistic-by-provider-type' title='Thống kê theo loại hình thu thập' hasBullet={true} />
          <AsideMenuItem to='/dataset/approve/statistic' title='Thống kê tổng hợp duyệt dữ liệu' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/data-categories'
        title='Danh mục dữ liệu'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem to='/data-categories/dataset' title='Tập dữ liệu' hasBullet={true} />
        <AsideMenuItem to='/data-categories/data-type' title='Loại dữ liệu' hasBullet={true} />
        <AsideMenuItem to='/data-categories/fields' title='Lĩnh vực' hasBullet={true} />
        <AsideMenuItem to='/data-categories/provider-type' title='Hình thức cung cấp' hasBullet={true} />
        <AsideMenuItem to='/data-categories/tag' title='Từ khóa' hasBullet={true} />
        <AsideMenuItem to='/data-categories/license' title='Giấy phép' hasBullet={true} />
        <AsideMenuItem to='/data-categories/organization' title='Tổ chức' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/administrative-categories'
        title='Danh mục thủ tục hành chính'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem to='/administrative-categories/document-type' title='Loại giấy tờ' hasBullet={true} />
        <AsideMenuItem to='/administrative-categories/mining-source' title='Nguồn khai thác' hasBullet={true} />
        <AsideMenuItem to='/administrative-categories/data-source' title='Nguồn dữ liệu' hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  )
}
