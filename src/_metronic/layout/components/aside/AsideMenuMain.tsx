import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { RootState } from 'src/setup'
import { Permissions } from 'src/app/constants'

export function AsideMenuMain() {
    const userInfo = useSelector((state: RootState) => state.global.userInfo)
    const userPermissions: Permissions[] | undefined = userInfo?.Roles?.map(
        (role: any) => role.LoginName
    )

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
                to='/common-categories'
                title='Danh mục chung'
                icon='/media/icons/duotune/general/gen022.svg'
                userPermissions={userPermissions}
                childrenPermissions={[
                    Permissions.ThuThapDuLieuDonVi,
                    Permissions.KhaiThacDuLieuDonVi,
                    Permissions.DuyetDuLieuDonVi,
                ]}
            >
                <AsideMenuItem
                    to='/common-categories/trinh-do-hoc-van'
                    title='Trình độ học vấn'
                    hasBullet={true}
                    userPermissions={userPermissions}
                    menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                />
            </AsideMenuItemWithSub>

            <AsideMenuItemWithSub
                to='/dataset'
                title='Thu thập dữ liệu'
                icon='/media/icons/duotune/general/gen022.svg'
                userPermissions={userPermissions}
                childrenPermissions={[
                    Permissions.ThuThapDuLieuDonVi,
                    Permissions.KhaiThacDuLieuDonVi,
                    Permissions.DuyetDuLieuDonVi,
                ]}
            >
                <AsideMenuItemWithSub
                    to='/dataset/webapi'
                    title='Web api'
                    hasBullet={true}
                    userPermissions={userPermissions}
                    childrenPermissions={[
                        Permissions.ThuThapDuLieuDonVi,
                        Permissions.KhaiThacDuLieuDonVi,
                    ]}
                >
                    <AsideMenuItem
                        to='/dataset/webapi/list'
                        title='Danh sách'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />
                    <AsideMenuItem
                        to='/dataset/webapi/config'
                        title='Cấu hình'
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

                    <AsideMenuItem
                        to='/dataset/webapi/giao-duc-dao-tao'
                        title='Lĩnh vực giáo dục đào tạo'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/y-te'
                        title='Lĩnh vực y tế'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/lao-dong-thuong-binh-xa-hoi'
                        title='Lĩnh vực lao động thương binh xã hội'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/cong-thuong'
                        title='Lĩnh vực công thương'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/nong-nghiep'
                        title='Lĩnh vực nông nghiệp'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/giao-thong-van-tai'
                        title='Lĩnh vực giao thông vận tải'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/thong-tin-truyen-thong'
                        title='Lĩnh vực thông tin truyền thông'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/noi-vu'
                        title='Lĩnh vực nội vụ'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/van-hoa-the-thao-du-lich'
                        title='Lĩnh vực văn hóa thể thao du lịch'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/ke-hoach-dau-tu'
                        title='Lĩnh vực kế hoạch đầu tư'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/tu-phap'
                        title='Lĩnh vực tư pháp'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/bao-hiem'
                        title='Lĩnh vực bảo hiểm'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/tai-chinh'
                        title='Lĩnh vực tài chính'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/khoa-hoc-cong-nghe'
                        title='Lĩnh vực khoa học công nghệ'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/webapi/xay-dung'
                        title='Lĩnh vực xây dựng'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />
                </AsideMenuItemWithSub>

                <AsideMenuItemWithSub
                    to='/dataset/database'
                    title='Database'
                    fontIcon='bi-archive'
                    hasBullet={true}
                    userPermissions={userPermissions}
                    childrenPermissions={[
                        Permissions.ThuThapDuLieuDonVi,
                        Permissions.KhaiThacDuLieuDonVi,
                    ]}
                >
                    <AsideMenuItem
                        to='/dataset/database/list'
                        title='Danh sách'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />
                    <AsideMenuItem
                        to='/dataset/database/config'
                        title='Cấu hình'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />
                    <AsideMenuItem
                        to='/dataset/database/sync-history'
                        title='Lịch sử đồng bộ'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.KhaiThacDuLieuDonVi]}
                    />
                    <AsideMenuItem
                        to='/dataset/database/statistic'
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
                    userPermissions={userPermissions}
                    childrenPermissions={[
                        Permissions.ThuThapDuLieuDonVi,
                        Permissions.KhaiThacDuLieuDonVi,
                    ]}
                >
                    <AsideMenuItem
                        to='/dataset/excel/list'
                        title='Danh sách'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />
                    <AsideMenuItem
                        to='/dataset/excel/config'
                        title='Cấu hình'
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
                    to='/dataset/manage'
                    title='Quản lý'
                    fontIcon='bi-archive'
                    hasBullet={true}
                    userPermissions={userPermissions}
                    childrenPermissions={[
                        Permissions.ThuThapDuLieuDonVi,
                        Permissions.KhaiThacDuLieuDonVi,
                    ]}
                >
                    <AsideMenuItem
                        to='/dataset/manage/list'
                        title='Danh sách'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/manage/by-category'
                        title='Theo lĩnh vực'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/manage/by-datatype'
                        title='Theo hình thức thu thập'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/manage/pending'
                        title='Dữ liệu chờ duyệt'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/manage/rejected'
                        title='Dữ liệu không duyệt'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/manage/approved'
                        title='Dữ liệu đã duyệt'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/manage/statistic-by-status'
                        title='Thống kê tổng hợp theo trạng thái'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/manage/statistic-by-category'
                        title='Thống kê tổng hợp theo lĩnh vực'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/manage/statistic-by-organization'
                        title='Thống kê tổng hợp theo đơn vị cung cấp'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
                    />

                    <AsideMenuItem
                        to='/dataset/manage/statistic-by-datatype'
                        title='Thống kê tổng hợp theo loại hình thu thập'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.ThuThapDuLieuDonVi]}
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
                    <AsideMenuItem
                        to='/dataset/approve/statistic-by-category'
                        title='Thống kê theo lĩnh vực'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.DuyetDuLieuDonVi]}
                    />
                    <AsideMenuItem
                        to='/dataset/approve/statistic-by-organization'
                        title='Thống kê theo đơn vị cung cấp'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.DuyetDuLieuDonVi]}
                    />
                    <AsideMenuItem
                        to='/dataset/approve/statistic-by-datatype'
                        title='Thống kê theo loại hình thu thập'
                        hasBullet={true}
                        userPermissions={userPermissions}
                        menuPermissions={[Permissions.DuyetDuLieuDonVi]}
                    />
                    <AsideMenuItem
                        to='/dataset/approve/statistic-by-datatype'
                        title='Thống kê tổng hợp'
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
