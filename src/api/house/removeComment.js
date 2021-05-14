import request from '../request'

const removeCommentRequest = params => {
  return request.get('/comment/removeComment', {
    params
  })
}

export default removeCommentRequest
