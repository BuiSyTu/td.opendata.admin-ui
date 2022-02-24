/* eslint-disable react/jsx-no-target-blank */
import { useSelector } from 'react-redux';

import { useIntl } from 'react-intl';
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';
import { AsideMenuItem } from './AsideMenuItem';

export function AsideMenuMain() {
  const intl = useIntl();
  const user: any = useSelector<any>((state) => state.auth.user);
  const userRoles = user?.roles ?? [];

  const CheckRole: any = (roles: Array<string>, role: Array<string>) => {
    return roles.some((v: any) => role.includes(v));
  };
  // console.log(CheckRole(userRoles, ['Admin', 'Adminaaa']));
  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />

      {/*       <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Danh mục</span>
        </div>
      </div> */}
      {CheckRole(userRoles, ['SuperAdmin', 'Admin']) ? (
        <div>
          <AsideMenuItemWithSub
            to='/categories'
            title='Danh mục'
            fontIcon='bi-archive'
            icon='/media/icons/duotune/general/gen022.svg'
          >
            <AsideMenuItem to='/categories/data-type' title='Loại dữ liệu' hasBullet={true} />
            <AsideMenuItem to='/categories/fields' title='Lĩnh vực' hasBullet={true} />
            <AsideMenuItem to='/categories/provider-type' title='Hình thức cung cấp' hasBullet={true} />
            <AsideMenuItem to='/categories/tag' title='Từ khóa' hasBullet={true} />
            <AsideMenuItem to='/categories/license' title='Giấy phép' hasBullet={true} />
            <AsideMenuItem to='/categories/genders' title='Giới tính' hasBullet={true} />
            <AsideMenuItem to='/categories/identitytypes' title='Loại giấy tờ' hasBullet={true} />
            <AsideMenuItem to='/categories/maritalstatus' title='Tình trạng hôn nhân' hasBullet={true} />
            <AsideMenuItem to='/categories/religions' title='Tôn giáo' hasBullet={true} />
            <AsideMenuItem to='/categories/areas' title='Địa bàn' hasBullet={true} />
            <AsideMenuItem to='/categories/placetypes' title='Loại địa điểm' hasBullet={true} />
            <AsideMenuItem to='/categories/places' title='Địa điểm' hasBullet={true} />
          </AsideMenuItemWithSub>
        </div>
      ) : (
        <></>
      )}
      {/* <AsideMenuItemWithSub
        to='/administration'
        title='Administration'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/administration/group' title='Cơ cấu đơn vị' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub> */}
    </>
  );
}
