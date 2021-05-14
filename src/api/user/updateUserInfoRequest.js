import request from '../request'

const updateUserInfoRequest = async data => {
  const res = await request.post('/user/update', data)
  console.log(res)
}

export default updateUserInfoRequest
