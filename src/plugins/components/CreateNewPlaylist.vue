<template>
    <v-dialog v-model="isDisplay" width="500" persistent>
        <v-card>
          <v-card-title
            class="headline primary "
            primary-title
          >
            {{$t('createNewPlaylist.createNewPlaylistLabel')}}
            <v-spacer></v-spacer>
            <v-icon @click="closeDialog">close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="newPlaylist.name" :label="$t('createNewPlaylist.playlistNameLabel')" type="text"></v-text-field>
          </v-card-text>
          <!-- <v-divider></v-divider> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="create()"
            >
              {{$t('createNewPlaylist.createLabel')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
import axios from 'axios'
import ActionTypes from '@/plugins/store/types.js'
export default {
  name: 'createNewPlaylist',
  props: {
  },
  beforeMount: function(){
  },
  data () {
    return {
      languages: ['ENG', 'CHN'],
      updatedVideo: {},
      isDisplay: true,
      newPlaylist: {}
    }
  },
  computed: {
  },
  methods: {
    create: function () {
      axios({
        method: 'POST',
        url: '/api/createNewPlaylist',
        data: this.newPlaylist
      }).then(
        (response) => {
          console.log('Create new playlist successful!')
          this.$confirmDialog(
                {
                  message: 'Playlist created!',
                  title: ''
                }
          )
        },
        (error) => {
        console.log(error)
        }
      )

      this.isDisplay=false
      this.$destroy()
    }
  }
}
</script>
