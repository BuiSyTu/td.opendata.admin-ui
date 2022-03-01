import axios from 'axios'

import SharepointApi from '../../../apis/SharepointApi'

const API_URL = process.env.REACT_APP_API_URL || 'api'
const sharepointApi = new SharepointApi()

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/identity/user-infor`
export const LOGIN_URL = `${API_URL}/tokens`
export const REGISTER_URL = `${API_URL}/identity/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/identity/forgot-password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.get(`${LOGIN_URL}?email=${email}&password=${password}`)
}

// Server should return AuthModel
export function register(
  email: string,
  fullName: string,
  userName: string,
  password: string,
  confirmPassword: string
) {
  return axios.post<any>(REGISTER_URL, {
    email,
    fullName,
    userName,
    password,
    confirmPassword,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {email})
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<any>(GET_USER_BY_ACCESSTOKEN_URL)
}
