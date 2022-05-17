import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MenuItem } from './MenuItem'
import { useIntl } from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />
      <MenuInnerWithSub
        title='Tập dữ liệu'
        to='/dataset'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuInnerWithSub
          title='Web api'
          to='/dataset/webapi'
          hasBullet={true}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/dataset/webapi/list' title='Danh sách' hasBullet={true} />
          <MenuItem to='/dataset/webapi/config' title='Cấu hình' hasBullet={true} />
          <MenuItem to='/dataset/webapi/sync-history' title='Lịch sử đồng bộ' hasBullet={true} />
          <MenuItem to='/dataset/webapi/statistic' title='Thống kê' hasBullet={true} />
        </MenuInnerWithSub>
        <MenuInnerWithSub
          title='File'
          to='/dataset/excel'
          hasBullet={true}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/dataset/excel/list' title='Danh sách' hasBullet={true} />
          <MenuItem to='/dataset/excel/config' title='Cấu hình' hasBullet={true} />
          <MenuItem to='/dataset/excel/sync-history' title='Lịch sử đồng bộ' hasBullet={true} />
          <MenuItem to='/dataset/excel/statistic' title='Thống kê' hasBullet={true} />
        </MenuInnerWithSub>
        <MenuInnerWithSub
          title='Database'
          to='/dataset/database'
          hasBullet={true}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/dataset/database/list' title='Danh sách' hasBullet={true} />
          <MenuItem to='/dataset/database/config' title='Cấu hình' hasBullet={true} />
          <MenuItem to='/dataset/database/sync-history' title='Lịch sử đồng bộ' hasBullet={true} />
          <MenuItem to='/dataset/database/statistic' title='Thống kê' hasBullet={true} />
        </MenuInnerWithSub>

        <MenuInnerWithSub
          title='Dữ liệu thu thập'
          to='/dataset/collect'
          hasBullet={true}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/dataset/collect/list' title='Danh sách' hasBullet={true} />
          <MenuItem to='/dataset/collect/config' title='Theo lĩnh vực' hasBullet={true} />
          <MenuItem to='/dataset/collect/syc-history' title='Theo trạng thái' hasBullet={true} />
          <MenuItem to='/dataset/collect/statistic' title='Theo đơn vị cung cấp' hasBullet={true} />
          <MenuItem to='/dataset/collect/statistic' title='Theo loại hình thu thập' hasBullet={true} />
        </MenuInnerWithSub>

        <MenuInnerWithSub
          title='Duyệt dữ liệu'
          to='/dataset/approve'
          hasBullet={true}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/dataset/approve/list' title='Đang chờ' hasBullet={true} />
          <MenuItem to='/dataset/approve/config' title='Không duyệt' hasBullet={true} />
          <MenuItem to='/dataset/approve/syc-history' title='Đã duyệt' hasBullet={true} />
          <MenuItem to='/dataset/approve/statistic-by-category' title='Thống kê theo lĩnh vực' hasBullet={true} />
          <MenuItem to='/dataset/approve/statistic-by-organization' title='Thống kê theo đơn vị cung cấp' hasBullet={true} />
          <MenuItem to='/dataset/approve/statistic-by-provider-type' title='Thống kê theo loại hình thu thập' hasBullet={true} />
          <MenuItem to='/dataset/approve/statistic' title='Thống kê duyệt dữ liệu' hasBullet={true} />
        </MenuInnerWithSub>
      </MenuInnerWithSub>
      <MenuInnerWithSub
        title='Danh mục dữ liệu'
        to='/data-categories'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem to='/data-categories/dataset' title='Tập dữ liệu' hasBullet={true} />
        <MenuItem to='/data-categories/data-type' title='Loại dữ liệu' hasBullet={true} />
        <MenuItem to='/data-categories/fields' title='Lĩnh vực' hasBullet={true} />
        <MenuItem to='/data-categories/provider-type' title='Hình thức cung cấp' hasBullet={true} />
        <MenuItem to='/data-categories/keyword' title='Từ khóa' hasBullet={true} />
        <MenuItem to='/data-categories/license' title='Giấy phép' hasBullet={true} />
        <MenuItem to='/data-categories/organization' title='Tổ chức' hasBullet={true} />
      </MenuInnerWithSub>

      <MenuInnerWithSub
        title='Danh mục thủ tục hành chính'
        to='/administrative-categories'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem to='/administrative-categories/document-type' title='Loại giấy tờ' hasBullet={true} />
        <MenuItem to='/administrative-categories/mining-source' title='Nguồn khai thác' hasBullet={true} />
        <MenuItem to='/administrative-categories/data-source' title='Nguồn dữ liệu' hasBullet={true} />
      </MenuInnerWithSub>
    </>
  )
}
