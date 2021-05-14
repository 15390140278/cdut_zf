import request from '../request'

const selectHouseRequest = async data => {
  const res = await request.post('/house/select', data)
  console.log(res)
}

export default selectHouseRequest