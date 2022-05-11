import {PageLink, PageTitle} from 'src/_metronic/layout/core'
import {Redirect, Route, Switch} from 'react-router-dom'

import {Campaigns} from './components/Campaigns'
import {Connections} from './components/Connections'
import {Documents} from './components/Documents'
import {Overview} from './components/Overview'
import {ProfileHeader} from './ProfileHeader'
import {Projects} from './components/Projects'
import React from 'react'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/crafted/pages/profile/overview',
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

const ProfilePage: React.FC = () => {
  return (
    <>
      <ProfileHeader />
      <Switch>
        <Route path='/crafted/pages/profile/overview'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
          <Overview />
        </Route>
        <Route path='/crafted/pages/profile/projects'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Projects</PageTitle>
          <Projects />
        </Route>
        <Route path='/crafted/pages/profile/campaigns'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Campaigns</PageTitle>
          <Campaigns />
        </Route>
        <Route path='/crafted/pages/profile/documents'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Documents</PageTitle>
          <Documents />
        </Route>
        <Route path='/crafted/pages/profile/connections'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Connections</PageTitle>
          <Connections />
        </Route>
        <Redirect from='/crafted/pages/profile' exact={true} to='/crafted/pages/profile/overview' />
        <Redirect to='/crafted/pages/profile/overview' />
      </Switch>
    </>
  )
}

export default ProfilePage
