import axios from 'axios'
import ActionTypes from '@/plugins/store/types.js'
export default {
  methods: {
    closeDialog () {
      this.isDisplay = false
    },
    // deleteVideo(instance, videoId){
    //   axios({
    //     method: 'GET',
    //     'url': '/api/deleteVideo/'+videoId
    //     // 'data': videoId
    //   }).then((response) => {
    //     console.log('delete video successful!')
    //     instance.$store.dispatch(ActionTypes.DELETE_VIDEO, {videoId: videoId})
    //   },
    //   (error) => {
    //     console.log(error)
    //   })
    // }

    deleteVideo(videoId){
          axios({
            method: 'GET',
            'url': '/api/deleteVideo/'+videoId
            // 'data': videoId
          }).then((response) => {
            console.log('delete video successful!')
            this.$store.dispatch(ActionTypes.DELETE_VIDEO, {videoId: videoId})
          },
          (error) => {
            console.log(error)
          })
    },
    updateVideo(video){
          axios({
            method: 'POST',
            'url': '/api/saveVideo',
            'data': video
          }).then((response) => {
            console.log('Update video successful!')
            console.log(response.data)
            this.$store.dispatch(ActionTypes.UPDATE_VIDEO, {video: response.data})
          },
          (error) => {
            console.log(error)
          })
    },
    clone(obj){
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
