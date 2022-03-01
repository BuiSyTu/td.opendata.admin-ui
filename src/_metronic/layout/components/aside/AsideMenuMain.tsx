/* eslint-disable react/jsx-no-target-blank */
import { useSelector } from 'react-redux'

import { useIntl } from 'react-intl'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()
  const user: any = useSelector<any>((state) => state.auth.user)
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
        fontIcon='bi-app-indicator'
      />

      {/* {CheckRole(userRoles, ['SuperAdmin', 'Admin']) ? (

      ) : (
        <></>
      )} */}
      <div>
        <AsideMenuItemWithSub
          to='/categories'
          title='Danh mục'
          fontIcon='bi-archive'
          icon='/media/icons/duotune/general/gen022.svg'
        >
          <AsideMenuItem to='/categories/dataset' title='Tập dữ liệu' hasBullet={true} />
          <AsideMenuItem to='/categories/data-type' title='Loại dữ liệu' hasBullet={true} />
          <AsideMenuItem to='/categories/fields' title='Lĩnh vực' hasBullet={true} />
          <AsideMenuItem to='/categories/provider-type' title='Hình thức cung cấp' hasBullet={true} />
          <AsideMenuItem to='/categories/tag' title='Từ khóa' hasBullet={true} />
          <AsideMenuItem to='/categories/license' title='Giấy phép' hasBullet={true} />
          <AsideMenuItem to='/categories/organization' title='Tổ chức' hasBullet={true} />
        </AsideMenuItemWithSub>
      </div>
    </>
  )
}
