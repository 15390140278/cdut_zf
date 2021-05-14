import request from '../request'

const option = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

const addHouseRequest = data => {
  return request.post('/house/add', request.qs(data), option)
}

export default addHouseRequest
