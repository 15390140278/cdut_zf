import request from '../request'

const cancelCheckRequest = async data => {
  const res = await request.post('/house/cancelCheck', data)
  console.log(res)
}

export default cancelCheckRequest