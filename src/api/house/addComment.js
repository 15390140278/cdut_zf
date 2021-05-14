import request from '../request'
import store from '../../store/index'
const addCommentRequest = data => {
  return request.post('/comment/addComment', request.qs(data), {
    headers: {
      token: store.state.user.token
    }
  })
}

export default addCommentRequest
