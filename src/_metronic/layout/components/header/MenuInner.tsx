import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import { RootState } from 'src/setup'
import { Permissions } from 'src/app/constants'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MenuItem } from './MenuItem'

export function MenuInner() {
  const userInfo = useSelector((state: RootState) => state.global.userInfo)
  const userPermissions: Permissions[] | undefined = userInfo?.Roles?.map((role: any) => role.LoginName)

  const intl = useIntl()
  return (
    <>
      <MenuItem
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        to='/dashboard'
        userPermissions={userPermissions}
        menuPermissions={[]}
      />

      <MenuInnerWithSub
        title='Dữ liệu đơn vị'
        to='/dataset'
        menuPlacement='bottom-start'
        menuTrigger='click'
        userPermissions={userPermissions}
        childrenPermissions={[Permissions.ThuThapDuLieuDonVi, Permissions.KhaiThacDuLieuDonVi, Permissions.DuyetDuLieuDonVi]}
      >
        <MenuInnerWithSub
          title='Web api'
          to='/dataset/webapi'
          hasBullet={true}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
          userPermissions={userPermissions}
          childrenPermissions={[Permissions.ThuThapDuLieuDonVi, Permissions.KhaiThacDuLieuDonVi]}
        >
          <MenuItem
            to='/dataset/webapi/list'
            title='Danh sách'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
          />
          <MenuItem
            to='/dataset/webapi/sync-history'
            title='Lịch sử đồng bộ'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
          />
          <MenuItem
            to='/dataset/webapi/statistic'
            title='Thống kê'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
          />
        </MenuInnerWithSub>

        <MenuInnerWithSub
          title='File'
          to='/dataset/excel'
          hasBullet={true}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
          userPermissions={userPermissions}
          childrenPermissions={[Permissions.KhaiThacDuLieuDonVi, Permissions.ThuThapDuLieuDonVi]}
        >
          <MenuItem
            to='/dataset/excel/list'
            title='Danh sách'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
          />
          <MenuItem
            to='/dataset/excel/sync-history'
            title='Lịch sử đồng bộ'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
          />
          <MenuItem
            to='/dataset/excel/statistic'
            title='Thống kê'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
          />
        </MenuInnerWithSub>

        <MenuInnerWithSub
          title='Duyệt dữ liệu'
          to='/dataset/approve'
          hasBullet={true}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
          userPermissions={userPermissions}
          childrenPermissions={[Permissions.DuyetDuLieuDonVi]}
        >
          <MenuItem
            to='/dataset/approve/list'
            title='Đang chờ'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.DuyetDuLieuDonVi]}
          />
          <MenuItem
            to='/dataset/approve/config'
            title='Không duyệt'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.DuyetDuLieuDonVi]}
          />
          <MenuItem
            to='/dataset/approve/syc-history'
            title='Đã duyệt'
            hasBullet={true}
            userPermissions={userPermissions}
            menuPermissions={[Permissions.DuyetDuLieuDonVi]}
          />
        </MenuInnerWithSub>
      </MenuInnerWithSub>

      <MenuInnerWithSub
        title='Danh mục dữ liệu'
        to='/data-categories'
        menuPlacement='bottom-start'
        menuTrigger='click'
        userPermissions={userPermissions}
        childrenPermissions={[Permissions.QuanTriDanhMucDuLieu]}
      >
        <MenuItem
          to='/data-categories/data-type'
          title='Loại dữ liệu'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <MenuItem
          to='/data-categories/fields'
          title='Lĩnh vực'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <MenuItem
          to='/data-categories/provider-type'
          title='Hình thức cung cấp'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <MenuItem
          to='/data-categories/keyword'
          title='Từ khóa'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <MenuItem
          to='/data-categories/license'
          title='Giấy phép'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
        <MenuItem
          to='/data-categories/organization'
          title='Tổ chức'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucDuLieu]}
        />
      </MenuInnerWithSub>

      <MenuInnerWithSub
        title='Danh mục thủ tục hành chính'
        to='/administrative-categories'
        menuPlacement='bottom-start'
        menuTrigger='click'
        userPermissions={userPermissions}
        childrenPermissions={[Permissions.QuanTriDanhMucThuTucHanhChinh]}
      >
        <MenuItem
          to='/administrative-categories/document-type'
          title='Loại giấy tờ'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucThuTucHanhChinh]}
        />
        <MenuItem
          to='/administrative-categories/mining-source'
          title='Nguồn khai thác'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucThuTucHanhChinh]}
        />
        <MenuItem
          to='/administrative-categories/data-source'
          title='Nguồn dữ liệu'
          hasBullet={true}
          userPermissions={userPermissions}
          menuPermissions={[Permissions.QuanTriDanhMucThuTucHanhChinh]}
        />
      </MenuInnerWithSub>

      <MenuInnerWithSub
        title='Quản trị hệ thống'
        to='/configs'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem
          to='/configs/header'
          title='Header'
          hasBullet={true}
        />
        <MenuItem
          to='/configs/footer'
          title='Footer'
          hasBullet={true}
        />
      </MenuInnerWithSub>
    </>
  )
}
