import request from '../request'

const releaseHouseRequest = async data => {
  const res = await request.post('/house/release', data)
  console.log(res)
}

export default releaseHouseRequest