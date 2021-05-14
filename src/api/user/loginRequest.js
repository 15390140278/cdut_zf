import request from '../request'

const loginRequest = data => {
  return data.hasOwnProperty('adminName') ? request.post('/admin/login', request.qs(data)) : request.post('/user/login', request.qs(data))
}

export default loginRequest
