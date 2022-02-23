import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PageLink, PageTitle} from '../../../_metronic/layout/core';
const SupplyDemandPage = () => {
  const DanhSachCungCau = lazy(() => import('./danh-sach-cung-cau/CungCauPage'));
  const DanhSachThuongHieu = lazy(() =>  import('./danh-muc-thuong-hieu/ThuongHieuPage'))
  return (
    <Switch>
      <Route path='/supplydemand/supplydemandlist' component={DanhSachCungCau}></Route>
      <Route path='/supplydemand/brandlist' component={DanhSachThuongHieu}></Route>
      <Redirect from='/supplydemand' exact={true} to='/supplydemand/supplydemandlist' />
      <Redirect to='/supplydemand/supplydemandlist' />
    </Switch>
  );
};

export default SupplyDemandPage;
