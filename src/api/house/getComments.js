import request from '../request'

const getCommentsRequest = params => {
  return request.get('/comment/getHouseComments', {
    params
  })
}

export default getCommentsRequest
