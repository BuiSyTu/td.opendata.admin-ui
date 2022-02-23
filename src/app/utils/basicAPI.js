import axios from 'axios';
import Cookies from 'js-cookie';

export const BASE_URL = 'https://apiai.tandan.com.vn:8081';
export const HOST = 'https://knccapi.hanhchinhcong.net/v1';
export const VER = '1';
export const HOST_API = 'https://apiai.tandan.com.vn:8081/api/v' + VER;
export const HOST_FILE = 'https://apiai.tandan.com.vn:8081/';
export const HOST_API_Image = HOST_API + '/File';

export const token = Cookies.get('user') ? JSON.parse(Cookies.get('user')).token : '';

export const requestGET = async (URL) => {
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

export const requestPOST = async (URL, data) => {
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

export const requestDELETE = async (URL) => {
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

export const requestPUT = async (URL, data) => {
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
export const requestPATCH = async (URL, data) => {
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

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
