import request from '../request'

const uploadPicturesRequest = async data => {
  const res = await request.post('/house/upPicture', data)
  console.log(res)
}

export default uploadPicturesRequest