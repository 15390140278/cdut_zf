import request from '../request'

const updatePasswordRequest = async data => {
  const res = await request.post('/user/updatePassword',data)
  console.log(res)
}

export default updatePasswordRequest