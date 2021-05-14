import request from '../request'

const selectHouseByPriceDescRequest = params => {
  return request.get('/house/selectByPriceDesc', {
    params
  })
}

export default selectHouseByPriceDescRequest
