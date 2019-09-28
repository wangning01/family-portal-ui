import ActionTypes from './types.js'

export default {
  [ActionTypes.UPDATE_LOGIN_STATUS] (context, status) {
    console.log('in Action UPDATE_LOGIN_STATUS:')
    console.log(status)
    context.commit(ActionTypes.UPDATE_LOGIN_STATUS, status)
  },
  // [ActionTypes.LOGIN]: function (context, credential) {
  //   return axios({
  //     method: 'POST',
  //     url: 'http://localhost:8080/api/login',
  //     data: credential,
  //     headers: {'content-type': 'application/json'}
  //   })
  // },
  [ActionTypes.SAVE_JWT]: (context, jwtToken) => {
    context.commit(ActionTypes.SAVE_JWT, jwtToken)
  },
  [ActionTypes.CLEAR_AUTH_DATA]: (context) => {
    context.commit(ActionTypes.CLEAR_AUTH_DATA)
  },
  [ActionTypes.UPDATE_VIDEOS]: (context, videos) => {
    context.commit(ActionTypes.UPDATE_VIDEOS, videos)
  },
  [ActionTypes.ADD_VIDEO]: (context, video) => {
    context.commit(ActionTypes.ADD_VIDEO, video)
  },
  [ActionTypes.DELETE_VIDEO]: (context, data) => {
    context.commit(ActionTypes.DELETE_VIDEO, data)
  },
  [ActionTypes.UPDATE_VIDEO]: (context, data) => {
    context.commit(ActionTypes.UPDATE_VIDEO, data)
  },
  [ActionTypes.UPDATE_FILTERS]: (context, data) => {
    context.commit(ActionTypes.UPDATE_FILTERS, data)
  }
}
