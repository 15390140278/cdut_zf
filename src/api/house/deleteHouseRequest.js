import request from '../request'

const deleteHouseRequest = async data => {
  const res = await request.post('/house/delete', data)
  console.log(res)
}

export default deleteHouseRequest