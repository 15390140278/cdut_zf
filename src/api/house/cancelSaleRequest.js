import request from '../request'

const cancelSaleRequest = async data => {
  const res = await request.post('/house/cancelSale', data)
  console.log(res)
}

export default cancelSaleRequest