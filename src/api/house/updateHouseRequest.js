import request from '../request'

const updateHouseRequest = async data => {
  const res = await request.post('/house/update', data)
  console.log(res)
}

export default updateHouseRequest