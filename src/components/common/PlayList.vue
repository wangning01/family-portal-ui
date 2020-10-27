<template>
<v-content>
    <v-dialog v-model="displayDialog" width="300" persistent>
        <v-card>
          <v-card-title
            class="headline primary "
            primary-title
          >
            {{$t('playlist.playlistLabel')}} - {{list.name}}
            <v-spacer></v-spacer>
            <v-icon @click="close">close</v-icon>
          </v-card-title>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="addToPlayListDialog(list)"
              color="primary"
              flat
             
            >
              {{$t('navigationDrawer.dialog.addLabel')}}
            </v-btn>
          </v-card-actions>
          <v-container>
          <v-layout row wrap>
            <v-card >
              <v-flex v-for="(video, index) in list.videos" :key="video.videoId" xs12 class="pr-1 pb-1">
                  <yt-player :yturl="video.youtubeLink" :ref="'yt'+index" :width="225" :height="120" 
                  :playerVars="playerVars" 
                   @playing="stopAndPlayInPopup('yt'+index, video)"
                  />
              </v-flex>
            </v-card>
          </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
</v-content>
</template>
<script>
import axios from 'axios'
import ActionTypes from '@/plugins/store/types.js'
export default {
  name: 'playList',
  props: {
    value : Boolean,
    list: Object
  },
  beforeMount: function(){
  },
  data () {
    return {
      isDisplay: false,
      thisVideo: {},
      playerVars: {
        origin: 'https://localhost:8080',
        enablejsapi: 1
      }
      
    }
  },
  computed: {
    displayDialog: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    close: function () {
      this.displayDialog=false
    },
    stopAndPlayInPopup: function(ref, video) {
      // Stop playing in place video in playlist
      this.$refs[ref][0].player.stopVideo()

      this.$playVideoList(
        {
          list: this.list.videos,
          startVideo: video,
          continuous: true
        }
      )

    },
    addToPlayListDialog: function(playlist){
      this.$addToPlayListDialog({list: playlist}).then(
        (response) => {
          if(response.videosToAdd.length > 0){
            console.log('this.list.videos:')
            console.log(this.list.videos)

            response.videosToAdd.forEach(video => {
              this.list.videos.push(video)
            });
            axios({
              method: 'POST',
              'url': '/api/savePlaylist',
              data: this.list
            });
          }
        }
      )
    }
  }
}
</script>
