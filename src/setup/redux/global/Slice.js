import _ from 'lodash';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  accessTokenOld: '',
  refreshToken: '',
  user: null,
  dataUser: [],
  dataRole: [],
  listGroupChild: [],
  currentChucVu: null,
  actionsLoading: false,
  entities: null,
  lastError: null,
  error: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    logOut: (state, action) => {
      state = initialState;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setDataUser: (state, action) => {
      const dataInfo = action.payload?.Info ?? [];
      const dataRole = action.payload?.Role ?? [];

      state.actionsLoading = false;
      state.error = null;
      state.dataUser = dataInfo;
      state.dataRole = dataRole;

      try {
        state.user = dataInfo[0];

        var arrDonVi = [];

        state.currentDonViDashboard = dataInfo[0].UserOffice;
        arrDonVi.push(dataInfo[0].UserOffice);

        let DonViTheoDoi_str = dataInfo[0]?.DonViTheoDoi ?? '[]';

        try {
          let donvitheodoi = JSON.parse(DonViTheoDoi_str);
          arrDonVi = [...arrDonVi, ...donvitheodoi];
        } catch (error_) {}

        arrDonVi = _.uniq(arrDonVi, 'GroupCode');

        var arrDoiTuongDanhGia = [];
        let TenNhomDoiTuongDanhGia_str = dataInfo[0]?.TenNhomDoiTuongDanhGia ?? '[]';

        try {
          let donvitheodoi = JSON.parse(TenNhomDoiTuongDanhGia_str);
          arrDoiTuongDanhGia = [...donvitheodoi];
        } catch (error_) {}

        state.listDoiTuongDanhGia = arrDoiTuongDanhGia;
        state.listDonViTheoDoi = arrDonVi;
        state.listDonViDashboard = [dataInfo[0].UserOffice];
      } catch (error) {
        state.currentChucVu = null;
      }
    },
    setCurrentChucVu: (state, action) => {
      const payload = action.payload;

      try {
        state.user = payload;

        var arrDonVi = [];

        state.currentDonViDashboard = payload.UserOffice;
        arrDonVi.push(payload.UserOffice);

        let DonViTheoDoi_str = payload?.DonViTheoDoi ?? '[]';

        try {
          let donvitheodoi = JSON.parse(DonViTheoDoi_str);
          arrDonVi = [...arrDonVi, ...donvitheodoi];
        } catch (error_) {}

        var arrDoiTuongDanhGia = [];
        let TenNhomDoiTuongDanhGia_str = payload?.TenNhomDoiTuongDanhGia ?? '[]';

        try {
          let donvitheodoi = JSON.parse(TenNhomDoiTuongDanhGia_str);
          arrDoiTuongDanhGia = [...donvitheodoi];
        } catch (error_) {}

        state.listDoiTuongDanhGia = arrDoiTuongDanhGia;
        state.listDonViTheoDoi = arrDonVi;
        state.listDonViDashboard = [payload.UserOffice];
      } catch (error) {
        state.currentChucVu = null;
      }
    },
    setListGroupChild: (state, action) => {
      const payload = action.payload;
      state.listGroupChild = payload;
    },
  },
});
