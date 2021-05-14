import request from '../request'

const selectHouseDefaultRequest = params => {
  return request.get('/house/selectByCondition', {
    params
  })
}

export default selectHouseDefaultRequest
