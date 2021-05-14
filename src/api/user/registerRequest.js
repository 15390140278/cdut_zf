import request from '../request'

const registerRequest = data => {
  return request.post('/user/register', request.qs(data))
}

export default registerRequest
