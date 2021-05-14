import request from '../request'

const uploadCoverRequest = async data => {
  const res = await request.post('/house/upCover', data)
  console.log(res)
}

export default uploadCoverRequest