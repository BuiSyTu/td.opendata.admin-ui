import axios from 'axios';
import Cookies from 'js-cookie';

export const BASE_URL = 'https://apiai.tandan.com.vn:8081';
export const HOST = 'https://knccapi.hanhchinhcong.net/v1';
export const VER = '1';
export const HOST_API = 'https://apiai.tandan.com.vn:8081/api/v' + VER;
export const HOST_FILE = 'https://apiai.tandan.com.vn:8081/';
export const HOST_API_Image = HOST_API + '/File';
export const HOST_WSO2 = 'https://api.namdinh.gov.vn';
export const HOST_PAKN = HOST_WSO2 + '/CDPAKN';
export const HOST_DVCCongDan = HOST_WSO2 + '/DVCCongDan';
export const HOST_OPDT = HOST_WSO2 + '/opdt';
export const HOST_FILE_PAKN = 'https://pakn.namdinh.gov.vn/';

export const tokenAPI = 'c48ddc19-5175-3ade-a252-ff6a14b60686';

export const requestGET = async (URL) => {
  const token = Cookies.get('user') ? JSON.parse(Cookies.get('user')).token : '';
  try {
    const res = await axios({
      method: 'GET',
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestDOWNLOAD = async (URL) => {
  const token = Cookies.get('user') ? JSON.parse(Cookies.get('user')).token : '';
  try {
    const res = await axios({
      method: 'GET',
      responseType: 'blob',
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const requestGET_t = async (URL, token) => {
  try {
    const res = await axios({
      method: 'GET',
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
export const requestGET_TK = async (URL, userToken) => {
  try {
    const res = await axios({
      method: 'GET',
      url: URL,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
export const requestGET_WSO2 = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      url: URL,
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPOST = async (URL, data) => {
  const token = Cookies.get('user') ? JSON.parse(Cookies.get('user')).token : '';
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      url: URL,
      data,
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPOST_WSO2 = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenAPI}`,
      },
      url: URL,
      data,
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestDELETE = async (URL) => {
  const token = Cookies.get('user') ? JSON.parse(Cookies.get('user')).token : '';
  try {
    const res = await axios({
      method: 'DELETE',
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestDELETE_WSO2 = async (URL) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: URL,
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPUT = async (URL, data) => {
  const token = Cookies.get('user') ? JSON.parse(Cookies.get('user')).token : '';
  try {
    const res = await axios({
      method: 'PUT',
      url: URL,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPUT_WSO2 = async (URL, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: URL,
      data,
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPATCH = async (URL, data) => {
  const token = Cookies.get('user') ? JSON.parse(Cookies.get('user')).token : '';
  try {
    const res = await axios({
      method: 'PATCH',
      url: URL,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPATCH_WSO2 = async (URL, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: URL,
      data,
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
