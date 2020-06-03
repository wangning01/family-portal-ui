<template>
    <v-navigation-drawer app width="220" class="" dark permanent  >
      <v-list>
          <v-list-tile>
          <v-list-tile-action>
            <v-icon>{{ addNewVideo.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              <v-list-tile-title  @click="openAddVideoDialog">
                <h4>
                  <!-- <router-link class="white" to="" @click.native.prevent="openAddVideoDialog">{{addNewVideo.title}}</router-link> -->
                  <a style="color:white">{{addNewVideo.title}}</a>
                </h4>
              </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content>
              <v-list-tile-title style="color:yellow">
                <h4 >
                   {{$t('navigationDrawer.filterBy')}}
                </h4>
              </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
          <v-list-group
            v-for="filter in filters"
            :key="filter.name"
            v-model="filter.active"
            :prepend-icon="filter.icon"
            no-action
          >
            <!-- <template v-slot:activator> -->
              <v-list-tile slot='activator'>
                <v-list-tile-content >
                  <v-list-tile-title >{{ filter.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            <!-- </template> -->

            <v-list-tile
              v-for="subItem in filter.items"
              :key="subItem.value"
            >
              <v-list-tile-content>
                <!-- <v-list-tile-sub-title>{{ subItem.title }}</v-list-tile-sub-title> -->
               <v-list-tile-sub-title> 
                 <!-- <router-link  :to="subitemLink(subItem)" class="white--text">{{ subItem.title }} 
                 </router-link> -->
                 <a  class="white--text" :title="subItem.value" @click.prevent="onClickFilterItem(subItem)">{{ subItem.value }} </a>
               </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <!-- <v-icon>{{ subItem.icon }}</v-icon> -->
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <!-- <v-divider></v-divider> -->
          <v-autocomplete
          v-model="autoCompleteSelectedVideoId"
          @change="onAutoCompleteSelect()"
          :label="$t('navigationDrawer.search')"
          item-text="name"
          item-value="videoId"
          :items="videos">
         </v-autocomplete>

         <v-autocomplete
          v-model="searchItem"
          :search-input.sync="ytQuery"
          :label="$t('navigationDrawer.searchYoutube')"
          @change="addVideo(searchItem)"
          item-text="name"
          item-value="videoId"
          :items="ytSearchResults"
          return-object>
         </v-autocomplete>

        </v-list>

        <v-layout>
          <v-flex xs8>
            <v-menu
            open-on-hover
            closeOnClick
            close-on-content-click
            offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn dark 
                  color="primary" 
                  v-on="on"
                > 
                  <v-icon dark>mdi-format-list-bulleted-square</v-icon>&nbsp;
                  {{$t('navigationDrawer.playlist')}}
                </v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in playlists"
                  :key="index"
                  @click="showPlaylist(item.playListId)"
                >
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
          <v-flex xs4>
            <v-btn color="primary" icon @click="createNewPlayList">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
               

      <add-video-dialog v-model="isDisplayDialog"></add-video-dialog>
      <!-- <play-list v-model="isDisplayPlayList" :list="playList"></play-list> -->
      <play-list v-model="isDisplayPlayList" :list="playlist"></play-list>
    </v-navigation-drawer>
</template>
<script>
import AddVideoDialog from '@/components/common/AddVideoDialog.vue'
import PlayList from '@/components/common/PlayList.vue'
import axios from 'axios'
import ActionTypes from '@/plugins/store/types.js'
import _ from 'lodash'

export default {
  name: 'Navigation',
  components: {AddVideoDialog, PlayList},
  beforeMount: function () {
  },
  mounted: function() {
    axios({
          method: 'GET',
          'url': '/api/getPlaylists'
          }).then((response) => {
            console.log(response.data)
            this.playlists = response.data
          },
          (error) => {
            console.log(error)
          });
  },
  data () {
    return {
      addNewVideo: {title: this.$t('navigationDrawer.addNewVideoLabel'), icon: 'add'},
      isDisplayDialog: false,
      autoCompleteSelectedVideoId: -1,
      searchItem: {},
      ytQuery: '',
      ytSearchResults: [],
      googleApiKey: 'AIzaSyA0W0jbMoiaQtv5tAoG29lZ_3QEAHgUkxk',
      isDisplayPlayList: false,
      playlist: {},
      playlists: []
    }
  },
  methods: {
    openAddVideoDialog: function () {
      console.log('openAddVideoDialog invoked...')
      this.isDisplayDialog = true
    },
    onClickFilterItem: function(subitem){ 
          console.log("subitem:")
          console.log(subitem)
          axios({
          method: 'GET',
          'url': '/api/filterBy/'+subitem.byColumn+"/"+subitem.value
          }).then((response) => {
            console.log('filtered videos:')
            console.log(response.data)
            this.$store.dispatch(ActionTypes.UPDATE_VIDEOS, {videos: response.data})
          },
          (error) => {
            console.log(error)
          });
    },
    onAutoCompleteSelect: function(){
      if(this.autoCompleteSelectedVideoId){
          axios({
          method: 'GET',
          'url': '/api/filterBy/video_id/'+this.autoCompleteSelectedVideoId
          }).then((response) => {
            console.log('filtered videos:')
            console.log(response.data)
            this.$store.dispatch(ActionTypes.UPDATE_VIDEOS, {videos: response.data})
          },
          (error) => {
            console.log(error)
          });
      }
    },
    onChange: function(){
      alert('input changed')
    },
    // searchYouTube: _.debounce((searchItem) => {
    //   let params = {
    //         key: 'AIzaSyA0W0jbMoiaQtv5tAoG29lZ_3QEAHgUkxk',
    //         q: searchItem,
    //         part: 'snippet',
    //         maxResults: 10,
    //         type: 'video',
    //         videoEmbeddable: true
    //   }
    //     axios.get('https://www.googleapis.com/youtube/v3/search', {params})
    //     .then(response => {
    //     console.log('search response:' + response)
    //     })
    // }, 500)
    searchYouTube: 
      _.debounce((_self) => {
        let params = {
              key: _self.googleApiKey,
              q: _self.ytQuery,
              part: 'snippet',
              maxResults: 10,
              type: 'video',
              videoEmbeddable: true
        }
          axios.get('https://www.googleapis.com/youtube/v3/search', {params})
          .then(response => {
          console.log( response.data)
          response.data.items.forEach(element => {
            _self.ytSearchResults.push(_self.convertToVideo(element))
          });

          })
      }, 500
    ),
    convertToVideo: function(ytItem){
      let video = {}
      video.youtubeLink = 'https://www.youtube.com/embed/'+ytItem.id.videoId
      video.name = ytItem.snippet.title
      return video

    },
    showPlaylist: function(playlistId){
      this.isDisplayPlayList = true
      this.getPlaylist(playlistId).then(
        (response) => {
            // console.log(response.data)
            this.playlist = response.data
        }
      );
    },
    createNewPlayList: function(){
      this.$createNewPlaylist().then(
        (response) => {
          console.log(response.data)
        }
      )
    }
  },
  computed: {
    filters: {
      get: function(){
        return this.$store.state.filters
      }
    },
    videos: {
      get: function(){
        return this.$store.state.videos
      }
    }
  },
  watch: {
    ytQuery: function(value){
        if(!value)
          return
        this.searchYouTube(this)
    }
  }
}

</script>
