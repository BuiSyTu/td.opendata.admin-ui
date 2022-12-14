import { KTSVG, checkIsActive } from 'src/_metronic/helpers'

import { Link } from 'react-router-dom'
import React from 'react'
import classnames from 'classnames'
import { useLocation } from 'react-router'
import { Permissions } from 'src/app/constants'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasArrow?: boolean
  hasBullet?: boolean
  userPermissions?: Permissions[]
  menuPermissions?: Permissions[]
}

const MenuItem: React.FC<Props> = ({
  to,
  title,
  icon,
  fontIcon,
  hasArrow = false,
  hasBullet = false,
  userPermissions = [],
  menuPermissions = [],
}) => {
  const hasPermission = menuPermissions.every(menuPermission => userPermissions.includes(menuPermission))

  const { pathname } = useLocation()

  return hasPermission ? (
    <div className='menu-item me-lg-1'>
      <Link
        className={classnames('menu-link py-3', {
          active: checkIsActive(pathname, to),
        })}
        to={to}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}

        {fontIcon && (
          <span className='menu-icon'>
            <i className={classnames('bi fs-3', fontIcon)}></i>
          </span>
        )}

        <span className='menu-title'>{title}</span>

        {hasArrow && <span className='menu-arrow'></span>}
      </Link>
    </div>
  ) : (
    <></>
  )
}

export { MenuItem }
