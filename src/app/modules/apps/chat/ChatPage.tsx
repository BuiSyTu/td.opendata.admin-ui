import {PageLink, PageTitle} from 'src/_metronic/layout/core'
import {Redirect, Route, Switch} from 'react-router-dom'

import {Drawer} from './components/Drawer'
import {Group} from './components/Group'
import {Private} from './components/Private'
import React from 'react'

const chatBreadCrumbs: Array<PageLink> = [
  {
    title: 'Chat',
    path: '/apps/chat/private-chat',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ChatPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/apps/chat/private-chat'>
        <PageTitle breadcrumbs={chatBreadCrumbs}>Private chat</PageTitle>
        <Private />
      </Route>
      <Route path='/apps/chat/group-chat'>
        <PageTitle breadcrumbs={chatBreadCrumbs}>Group chat</PageTitle>
        <Group />
      </Route>
      <Route path='/apps/chat/drawer-chat'>
        <PageTitle breadcrumbs={chatBreadCrumbs}>Drawer chat</PageTitle>
        <Drawer />
      </Route>
      <Redirect from='/apps/chat' exact={true} to='/apps/chat/private-chat' />
      <Redirect to='/apps/chat/private-chat' />
    </Switch>
  )
}

export default ChatPage
