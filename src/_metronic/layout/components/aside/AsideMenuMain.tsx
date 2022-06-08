import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { RootState } from 'src/setup'
import { Permissions } from 'src/app/constants'

export function AsideMenuMain() {
  const userInfo = useSelector((state: RootState) => state.global.userInfo)
  const userPermissions = userInfo?.Roles?.map((role: any) => role.LoginName)

  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        userPermissions={userPermissions}
        menuPermissions={[]}
      />

      <AsideMenuItemWithSub
        to='/dataset'
        title='Dữ liệu đơn vị'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub
          to='/dataset/webapi'
          title='Web api'
          hasBullet={true}
        >
          <AsideMenuItem
            to='/dataset/webapi/list'
            title='Danh sách'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
          />
          <AsideMenuItem
            to='/dataset/webapi/sync-history'
            title='Lịch sử đồng bộ'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
          />
          <AsideMenuItem
            to='/dataset/webapi/statistic'
            title='Thống kê'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub
          to='/dataset/excel'
          title='File'
          fontIcon='bi-archive'
          hasBullet={true}
        >
          <AsideMenuItem
            to='/dataset/excel/list'
            title='Danh sách'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
          />
          <AsideMenuItem
            to='/dataset/excel/sync-history'
            title='Lịch sử đồng bộ'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
          />
          <AsideMenuItem
            to='/dataset/excel/statistic'
            title='Thống kê'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub
          to='/dataset/approve'
          title='Duyệt dữ liệu'
          fontIcon='bi-archive'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.DuyetDuLieuDonVi]}
        >
          <AsideMenuItem
            to='/dataset/approve/pending'
            title='Đang chờ'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.DuyetDuLieuDonVi]}
          />
          <AsideMenuItem
            to='/dataset/approve/rejected'
            title='Không duyệt'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.DuyetDuLieuDonVi]}
          />
          <AsideMenuItem
            to='/dataset/approve/approved'
            title='Đã duyệt'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.DuyetDuLieuDonVi]}
          />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/data-categories'
        title='Danh mục dữ liệu'
        icon='/media/icons/duotune/general/gen022.svg'
        userPermissions={userPermissions}
        menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
      >
        <AsideMenuItem
          to='/data-categories/data-type'
          title='Loại dữ liệu'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <AsideMenuItem
          to='/data-categories/fields'
          title='Lĩnh vực'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <AsideMenuItem
          to='/data-categories/provider-type'
          title='Hình thức cung cấp'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <AsideMenuItem
          to='/data-categories/tag'
          title='Từ khóa'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <AsideMenuItem
          to='/data-categories/license'
          title='Giấy phép'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <AsideMenuItem
          to='/data-categories/organization'
          title='Tổ chức'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/administrative-categories'
        title='Danh mục thủ tục hành chính'
        icon='/media/icons/duotune/general/gen022.svg'
        userPermissions={userPermissions}
        menuPermissions={[Permissions.QuanTriDanhMucThuTucHanhChinh]}
      >
        <AsideMenuItem
          to='/administrative-categories/document-type'
          title='Loại giấy tờ'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucThuTucHanhChinh]}
        />
        <AsideMenuItem
          to='/administrative-categories/mining-source'
          title='Nguồn khai thác'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucThuTucHanhChinh]}
        />
        <AsideMenuItem
          to='/administrative-categories/data-source'
          title='Nguồn dữ liệu'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucThuTucHanhChinh]}
        />
      </AsideMenuItemWithSub>
    </>
  )
}
