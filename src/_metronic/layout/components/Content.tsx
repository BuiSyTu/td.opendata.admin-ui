import React, { useEffect } from 'react'

import { DrawerComponent } from '../../assets/ts/components'
import classnames from 'classnames'
import { useLayout } from '../core'
import { useLocation } from 'react-router'

const Content: React.FC = ({ children }) => {
  const { classes } = useLayout()
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div id='kt_content_container' className={classnames(classes.contentContainer.join(' '))}>
      {children}
    </div>
  )
}

export { Content }

