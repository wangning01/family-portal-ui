<template>
    <v-navigation-drawer app width="230" class="" dark permanent  >
      <v-list>
          <v-list-tile
         >
          <v-list-tile-action>
            <v-icon>{{ addNewVideo.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              <v-list-tile-title @click="openAddVideoDialog">
                <h4>
                  <!-- <router-link class="white" to="" @click.native.prevent="openAddVideoDialog">{{addNewVideo.title}}</router-link> -->
                  <a>{{addNewVideo.title}}</a>
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
        </v-list>

      <add-video-dialog v-model="isDisplayDialog"></add-video-dialog>
    </v-navigation-drawer>
</template>
<script>
import AddVideoDialog from '@/components/common/AddVideoDialog.vue'
import axios from 'axios'
import ActionTypes from '@/plugins/store/types.js'
// import jQuery from 'jquery'
// let $ = jQuery

export default {
  name: 'Navigation',
  components: {AddVideoDialog},
  beforeMount: function () {
  },
  data () {
    return {
      addNewVideo: {title: this.$t('navigationDrawer.addNewVideoLabel'), icon: 'add'},
      items: [
        { title: this.$t('navigationDrawer.addNewVideoLabel'), icon: 'add' }
      ],
      isDisplayDialog: false
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
    }
  },
  computed: {
    filters: {
      get: function(){
        return this.$store.state.filters
      }
    }
  }
}

</script>
