import request from '../request'

const selectHouseByPriceAscRequest = params => {
  return request.get('/house/selectByPriceAsc', {
    params
  })
}

export default selectHouseByPriceAscRequest
