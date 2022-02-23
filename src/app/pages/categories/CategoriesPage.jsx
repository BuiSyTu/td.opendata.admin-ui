import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PageLink, PageTitle} from '../../../_metronic/layout/core';
const CategoriesPage = () => {
  const LinhVucPage = lazy(() => import('./linh-vuc/LinhVucPage'));
  const LoaiGiayToPage = lazy(() => import('./loai-giay-to/LoaiGiayToPage'));
  const TinhTrangHonNhanPage = lazy(() => import('./tinh-trang-hon-nhan/TinhTrangHonNhanPage'));
  const TonGiaoPage = lazy(() => import('./ton-giao/TonGiaoPage'));
  const DiaBanPage = lazy(() => import('./dia-ban/DiaBanPage'));
  const LoaiDiaDiemPage = lazy(() => import('./loai-dia-diem/LoaiDiaDiemPage'));
  const DiaDiemPage = lazy(() => import('./dia-diem/DiaDiemPage'));
  const GioiTinhPage = lazy(() => import('./gioi-tinh/GioiTinhPage'));
  return (
    <Switch>
      <Route path='/categories/fields' component={LinhVucPage}></Route>
      <Route path='/categories/genders' component={GioiTinhPage}></Route>
      <Route path='/categories/identitytypes' component={LoaiGiayToPage}></Route>
      <Route path='/categories/maritalstatus' component={TinhTrangHonNhanPage}></Route>
      <Route path='/categories/religions' component={TonGiaoPage}></Route>
      <Route path='/categories/areas' component={DiaBanPage}></Route>
      <Route path='/categories/placetypes' component={LoaiDiaDiemPage}></Route>
      <Route path='/categories/places' component={DiaDiemPage}></Route>
      <Route path='/categories/genders'></Route>
      <Redirect from='/categories' exact={true} to='/categories/fields' />
      <Redirect to='/categories/fields' />
    </Switch>
  );
};

export default CategoriesPage;
