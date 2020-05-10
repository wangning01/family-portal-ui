import ActionTypes from './types.js'

export default {
  [ActionTypes.UPDATE_LOGIN_STATUS] (state, payload) {
    state.isLoggedIn = payload.status
  },
  [ActionTypes.SAVE_JWT] (state, payload) {
    console.log(payload)
    state.jwtToken = payload.jwtToken
  },
  [ActionTypes.CLEAR_AUTH_DATA] (state) {
    state.isLoggedIn = false
    state.jwtToken = null
    state.username = null
  },
  [ActionTypes.UPDATE_VIDEOS] (state, payload) {
    state.videos = payload.videos
  },
  [ActionTypes.ADD_VIDEO] (state, payload) {
    console.log('payload')
    console.log(payload)
    console.log(state.videos)
    // state.videos = payload.video
    // state.videos.splice(state.videos.length, 1, payload.video)
    state.videos.push(payload.video)
  },
  [ActionTypes.DELETE_VIDEO] (state, payload) {
    console.log('payload')
    console.log(payload)
    state.videos = state.videos.filter(e => {return e.videoId !== payload.videoId})
  },
  [ActionTypes.UPDATE_VIDEO] (state, payload) {
    console.log('payload')
    console.log(payload)
    state.videos.splice(state.videos.findIndex(video=>video.videoId===payload.video.videoId),1, payload.video)
  },
  [ActionTypes.UPDATE_FILTERS] (state, payload) {
    console.log('payload')
    console.log(payload)
    state.filters = payload.filters
  },
  [ActionTypes.SAVE_PLAYLIST] (state, payload) {
    console.log('payload')
    console.log(payload)
    state.playLists = payload.playLists
  }
  

  
  

}
