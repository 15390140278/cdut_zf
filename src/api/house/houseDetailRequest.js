import request from '../request'

const houseDetailRequest = params => {
  return request.get('/house/detail', {
    params
  })
}

export default houseDetailRequest
