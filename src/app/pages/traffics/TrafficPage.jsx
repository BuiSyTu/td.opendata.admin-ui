import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PageLink, PageTitle} from '../../../_metronic/layout/core';
const TrafficPage = () => {
  const ChinhSachXePage = lazy(() => import('./DanhMucChung/chinh-sach-xe/ChinhSachXePage'));
  const TienIchXePage = lazy(() => import('./DanhMucChung/tien-ich-xe/TienIchXePage'));
  const BienBaoPage = lazy(() => import('./DanhMucChung/bien-bao/BienBaoPage'));
  const LoaiBienBaoPage = lazy(() => import('./DanhMucChung/loai-bien-bao/LoaiBienBaoPage'));
  const LoaiPhuongTienPage = lazy(() => import('./DanhMucChung/loai-phuong-tien/LoaiPhuongTienPage'));
  const DiXeKhachPage = lazy(() => import('./di-xe-khach/DiXeKhachPage'));
  const DiChungXePage = lazy(() => import('./di-chung-xe/DiChungXePage') )
  return (
    <Switch>
      <Route path='/traffics/carpolicys' component={ChinhSachXePage}></Route>
      <Route path='/traffics/trafficsigns' component={BienBaoPage}></Route>
      <Route path='/traffics/carutilitys' component={TienIchXePage}></Route>
      <Route path='/traffics/trafficsigntypes' component={LoaiBienBaoPage}></Route>
      <Route path='/traffics/vehicletypes' component={LoaiPhuongTienPage}></Route>
      <Route path='/traffics/vehicles' component={DiXeKhachPage}></Route>
      <Route path='/traffics/carpools' component={DiChungXePage}></Route>
      <Redirect from='/traffics' exact={true} to='/traffics/carpolicys' />
      <Redirect to='/traffics/carpolicys' />
    </Switch>
  );
};

export default TrafficPage;
