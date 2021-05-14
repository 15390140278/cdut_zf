import request from '../request'

const addCommentRequest = data => {
  return request.get('/comment/addComment', data)
}

export default addCommentRequest
