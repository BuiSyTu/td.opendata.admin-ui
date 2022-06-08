import { KTSVG, checkIsActive } from 'src/_metronic/helpers'

import { Link } from 'react-router-dom'
import React from 'react'
import classnames from 'classnames'
import { useLayout } from 'src/_metronic/layout/core'
import { useLocation } from 'react-router'
import { Permissions } from 'src/app/constants'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  menuPermissions?: Permissions[]
  userPermissions?: Permissions[]
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  menuPermissions = [],
  userPermissions = [],
}) => {
  const hasPermission = menuPermissions.every(menuPermission => userPermissions.includes(menuPermission))

  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { aside } = config

  return hasPermission ? (
    <div className='menu-item'>
      <Link className={classnames('menu-link without-sub', { active: isActive })} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={classnames('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  ) : (
    <></>
  )

}

export { AsideMenuItem }
