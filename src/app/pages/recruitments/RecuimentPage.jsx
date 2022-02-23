import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PageLink, PageTitle} from '../../../_metronic/layout/core';
const RecuimentPage = () => {
  const PhucLoiPage = lazy(() => import('./phuc-loi-cong-ty/PhucLoiCongTyPage'));
  const LoaiBangCapPage = lazy(() => import('./loai-bang-cap/LoaiBangCapPage'));
  const KinhNghiemLamViecPage = lazy(() => import('./kinh-nghiem-lam-viec/KinhNghiemLamViecPage'));
  const NganhNgheKinhDoanhPage = lazy(() => import('./nganh-nghe-kinh-doanh/NganhNgheKinhDoanhPage'));
  const DoTuoiPage = lazy(() => import('./do-tuoi/DoTuoiPage'));
  const NgheNghiepPage = lazy(() => import('./nghe-nghiep/NgheNghiepPage'));
  const ViTriTuyenDungPage = lazy(() => import('./vi-tri-tuyen-dung/ViTriTuyenDungPage'));
  const LoaiHinhCongViecPage = lazy(() => import('./loai-hinh-cong-viec/LoaiHinhCongViecPage'));
  const MucLuongPage = lazy(() => import('./muc-luong/MucLuongPage'));
  const DanhSachTuyenDung = lazy(() => import('./danh-sach-tuyen-dung/DanhSachTuyenDungPage'));
  return (
    <Switch>
      <Route path='/recruitments/benifits' component={PhucLoiPage}></Route>
      <Route path='/recruitments/degrees' component={LoaiBangCapPage}></Route>
      <Route path='/recruitments/experiences' component={KinhNghiemLamViecPage}></Route>
      <Route path='/recruitments/industries' component={NganhNgheKinhDoanhPage}></Route>
      <Route path='/recruitments/jobages' component={DoTuoiPage}></Route>
      <Route path='/recruitments/jobnames' component={NgheNghiepPage}></Route>
      <Route path='/recruitments/jobpositions' component={ViTriTuyenDungPage}></Route>
      <Route path='/recruitments/jobtypes' component={LoaiHinhCongViecPage}></Route>
      <Route path='/recruitments/salaries' component={MucLuongPage}></Route>
      <Route path='/recruitments/recuimentlists' component={DanhSachTuyenDung}></Route>
      <Redirect from='/recruitments' exact={true} to='/recruitments/recuimentlists' />
      <Redirect to='/recruitments/recuimentlists' />
    </Switch>
  );
};

export default RecuimentPage;
