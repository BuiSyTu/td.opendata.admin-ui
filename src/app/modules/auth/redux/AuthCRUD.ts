import { sharepointApi } from 'src/app/apis'

// Server should return AuthModel
export function login(user: string, pass: string) {
  return sharepointApi.getUserTokenKey(user, pass)
}
