import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { RootState } from 'src/setup'
import { Permissions } from 'src/app/constants'

export function AsideMenuMain() {
  const userInfo = useSelector((state: RootState) => state.global.userInfo)
  const userPermissions: Permissions[] | undefined = userInfo?.Roles?.map((role: any) => role.LoginName)

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
        userPermissions={userPermissions}
        childrenPermissions={[Permissions.ThuThapDuLieuDonVi, Permissions.KhaiThacDuLieuDonVi, Permissions.DuyetDuLieuDonVi]}
      >
        <AsideMenuItemWithSub
          to='/dataset/webapi'
          title='Web api'
          hasBullet={true}
          userPermissions={userPermissions}
          childrenPermissions={[Permissions.ThuThapDuLieuDonVi, Permissions.KhaiThacDuLieuDonVi]}
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
          <AsideMenuItemWithSub
            to='dataset/webapi/categories'
            title='Theo lĩnh vực'
            hasBullet
            userPermissions={userPermissions}
            childrenPermissions={[Permissions.ThuThapDuLieuDonVi, Permissions.KhaiThacDuLieuDonVi]}
          >
            <AsideMenuItem
              to='/dataset/webapi/categories/giao-duc-dao-tao'
              title='Giáo dục đào tạo'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/y-te'
              title='Y tế'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/lao-dong-thuong-binh-xa-hoi'
              title='Lao động thương binh xã hội'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/cong-thuong'
              title='Công thương'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/nong-lam-ngu-nghiep'
              title='Nông lâm ngư nghiệp'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/giao-thong-van-tai'
              title='Giao thông vận tải'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/thong-tin-truyen-thong'
              title='Thông tin truyền thông'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/noi-vu'
              title='Nội vụ'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/van-hoa-the-thao-du-lich'
              title='Văn hóa thể thao du lịch'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/ke-hoach-dau-tu'
              title='Kế hoạch đầu tư'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/tu-phap'
              title='Tư pháp'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/bao-hiem'
              title='Bảo hiểm'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/tai-chinh'
              title='Tài chính'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/khoa-hoc-cong-nghe'
              title='Khoa học công nghệ'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
            <AsideMenuItem
              to='/dataset/webapi/categories/xay-dung'
              title='Xây dựng'
              hasBullet={true}
              userPermissions={userPermissions}
              menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
            />
          </AsideMenuItemWithSub>
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub
          to='/dataset/excel'
          title='File'
          fontIcon='bi-archive'
          hasBullet={true}
          userPermissions={userPermissions}
          childrenPermissions={[Permissions.ThuThapDuLieuDonVi, Permissions.KhaiThacDuLieuDonVi]}
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
          childrenPermissions={[Permissions.DuyetDuLieuDonVi]}
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
        childrenPermissions={[Permissions.QuanTriDanhMucDuLieu]}
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
        childrenPermissions={[Permissions.QuanTriDanhMucThuTucHanhChinh]}
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

      <AsideMenuItemWithSub
        to='/configs'
        title='Quản trị'
        icon='/media/icons/duotune/general/gen022.svg'
        userPermissions={userPermissions}
      >
        <AsideMenuItem
          to='/configs/footer'
          title='Footer'
          hasBullet={true}
          userPermissions={userPermissions}
        />
        <AsideMenuItem
          to='/configs/banner'
          title='Banner'
          hasBullet={true}
          userPermissions={userPermissions}
        />
      </AsideMenuItemWithSub>
    </>
  )
}
