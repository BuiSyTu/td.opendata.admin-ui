import React from 'react'
import classnames from 'classnames'
import { useLocation } from 'react-router'

import { Permissions } from 'src/app/constants'
import { useLayout } from 'src/_metronic/layout/core'
import { KTSVG, checkIsActive } from 'src/_metronic/helpers'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  menuPermissions?: Permissions[]
  userPermissions?: Permissions[]
}

const AsideMenuItemWithSub: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
  menuPermissions = [],
  userPermissions = [],
}) => {
  const hasPermission = menuPermissions.every(menuPermission => userPermissions.includes(menuPermission))

  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { aside } = config

  return hasPermission ? (
    <div
      className={classnames('menu-item', { 'here show': isActive }, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
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
        <span className='menu-arrow'></span>
      </span>
      <div className={classnames('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
        {children}
      </div>
    </div>
  ) : (
    <></>
  )
}

export { AsideMenuItemWithSub }
