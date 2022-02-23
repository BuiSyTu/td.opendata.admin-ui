import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PageLink, PageTitle} from '../../../_metronic/layout/core';
const AdministrationPage = () => {
  const MainPage = lazy(() => import('./co-cau-don-vi/MainPage'));
  return (
    <Switch>
      <Route path='/administration/group' component={MainPage}></Route>
      <Redirect from='/administration' exact={true} to='/administration/group' />
      <Redirect to='/administration/group' />
    </Switch>
  );
};

export default AdministrationPage;
