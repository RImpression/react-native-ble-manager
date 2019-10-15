import { delay } from '../utils';
import result from './result';


const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoi6LaF57qn566h55CG5ZGYIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJuYmYiOjE1NTQ5NzczMDIsImV4cCI6MTU1NTA2MzcwMiwiaXNzIjoiVXRvcGEuVG1zLkFkbWluLnRva2VuIiwiYXVkIjoiVXRvcGEuVG1zLkFkbWluLnRva2VuIn0.jC7oEd_17naNmrSkYkae6SBs9J55PgFof8xjV94u2P4'

const role = {
  driver: { name: '何润东', phone: 13111112222 },
  rider: { name: '刘德华', phone: 13539908052 },
  deliver: { name: '周润发', phone: 13539908052 },
}

export const login = async (data) => {
  const { password, account } = data
  await delay(500)

  if (password === '123456' && role[account]) {
    return result.success({
      token: mockToken,
      role: account,
      ...role[account]
    })
  } else {
    return result.error('账号密码错误')
  }
}

export const logout = async data => {
  await delay(500)
  return result.success({})
}