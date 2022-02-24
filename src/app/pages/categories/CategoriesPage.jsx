import {lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';


const CategoriesPage = () => {
  const LinhVucPage = lazy(() => import('./linh-vuc/LinhVucPage'));
  const LoaiDuLieuPage = lazy(() => import('./loai-du-lieu/LoaiDuLieuPage'));
  const HinhThucCungCapPage = lazy(() => import('./hinh-thuc-cung-cap/HinhThucCungCapPage'));
  const TuKhoaPage = lazy(() => import('./tu-khoa/TuKhoaPage'));
  const GiayPhepPage = lazy(() => import('./giay-phep/GiayPhepPage'));
  const ToChucPage = lazy(() => import('./to-chuc/ToChucPage'));

  return (
    <Switch>
      <Route path='/categories/data-type' component={LoaiDuLieuPage}></Route>
      <Route path='/categories/fields' component={LinhVucPage}></Route>
      <Route path='/categories/provider-type' component={HinhThucCungCapPage}></Route>
      <Route path='/categories/tag' component={TuKhoaPage}></Route>
      <Route path='/categories/license' component={GiayPhepPage}></Route>
      <Route path='/categories/organization' component={ToChucPage}></Route>
      <Redirect from='/categories' exact={true} to='/categories/fields' />
      <Redirect to='/categories/fields' />
    </Switch>
  );
};

export default CategoriesPage;
