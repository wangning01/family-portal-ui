<template>
  <v-content class="background">
    <navigation-comp></navigation-comp>
    <v-container fluid >
      <v-layout row wrap>
        <v-flex  xs12 >
          <div class="spaceHolder">
            <header-comp></header-comp>
          </div>
        </v-flex>
        <v-flex v-for="(video, index) in videos" :key="video.videoId" xs4 class="pr-1 pb-1">
          <v-card >
            <v-layout >
              <v-flex xs8 class="video-bg-color" @click.prevent="play(video)">
                  <v-layout>
                      <yt-player :yturl="video.youtubeLink" ref="yt" :width="215" :height="120" :playerVars="playerVars"></yt-player>
                  </v-layout>
              </v-flex>
              <v-flex xs4 class="video-bg-color" >
                <!-- <v-container fill-height> -->
                  <v-layout column wrap justify-center>
                    <!-- <div> -->
                      <v-layout row wrap>
                        <v-flex xs9  @click="play(video)" pl-1>
                          <h4>{{video.name}}</h4>
                        </v-flex>
                        <v-flex xs3 pr-1>
                          <v-icon @click="showMenu(video, index)" :id="'menu_'+index">menu</v-icon>
                        </v-flex>
                      </v-layout>
                      <v-layout  @click="play(video)" row wrap>
                        <v-flex xs10 pl-1>
                        <b>by</b> {{video.performedBy}}
                        </v-flex>
                      </v-layout>
                  </v-layout>
                  <!-- <v-layout  @click="play(video)" column wrap justify-center >
                    <v-layout row wrap>
                    <v-flex xs12 >
                        by {{video.performedBy}}
                    </v-flex>
                    </v-layout>
                  </v-layout> -->
                <!-- </v-container> -->
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
/* eslint-disable no-dupe-keys */
import HeaderComp from '@/components/common/HeaderComp.vue'
import NavigationComp from '@/components/common/NavigationComp.vue'
import axios from 'axios'
import ActionTypes from '@/plugins/store/types.js'

export default {
  name: 'Home',
  components: {HeaderComp, NavigationComp},
  beforeMount: function () {
    // console.log(this.$store.state)
    axios({
      method: 'GET',
      'url': '/api/allVideos'
    }).then((response) => {
      console.log('videos:')
      console.log(response.data)
      this.$store.dispatch(ActionTypes.UPDATE_VIDEOS, {videos: response.data})
    },
    (error) => {
      console.log(error)
    });

    // Load left navigation filters
    axios({
      method: 'GET',
      'url': '/api/filters'
    }).then((response) => {
      console.log('filters:')
      console.log(response.data)
      this.$store.dispatch(ActionTypes.UPDATE_FILTERS, {filters: response.data})
    },
    (error) => {
      console.log(error)
    });

  },
  data () {
    return {
      items: [
        { title: this.$t('navigationDrawer.addNewVideoLabel'), icon: 'add' }
      ],
      isDisplay: false,
      playerVars: {
        origin: 'https://localhost:8080',
        enablejsapi: 1
      },
      thisVideo: {},
      isDisplayEditDialog: false
    }
  },
  computed: {
    videos: {
      get: function () {
        return this.$store.state.videos
      }
    }
  },
  methods: {
    play (video) {
      this.$playVideoList(
        {
          startVideo: video,
          list: this.videos,
          continuous: true
        }
      )
    },
    showMenu (video, index) {
      // alert('Menu clicked.')
      let options = {
        parent: this,
        video: video,
        index: index
      }
      this.$actionOnVideoDialog(options).then(
        response => {
          console.log('action: '+response.action)
        }
      )
    }
    
  }
}
</script>

<style scoped>
  .background {
    /*background-image: url("../assets/image/home.jpg");*/
    background-size: cover;
  }
  .spaceHolder {
    height: 20px;
  }
  .resultContainer {
    height: 350px;
  }

  .video-bg-color {
    background-color: rgb(163, 163, 194)
  }
</style>
