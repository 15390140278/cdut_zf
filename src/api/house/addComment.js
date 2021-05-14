import request from '../request'

const addCommentRequest = data => {
  return request.post('/comment/addComment', request.qs(data))
}

export default addCommentRequest
