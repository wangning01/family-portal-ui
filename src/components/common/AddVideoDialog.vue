<template>
    <v-dialog v-model="isDisplay" width="500" persistent>
        <v-card>
          <v-card-title
            class="headline primary "
            primary-title
          >
            {{$t('navigationDrawer.addNewVideoLabel')}}
            <v-spacer></v-spacer>
            <v-icon @click="closeDialog">close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="video.name" :label="$t('navigationDrawer.dialog.videoTitleLabel')" type="text"></v-text-field>
            <v-text-field v-model="video.performedBy" :label="$t('navigationDrawer.dialog.videoByLabel')" type="text"></v-text-field>
            <v-text-field v-model="video.youtubeLink" :label="$t('navigationDrawer.dialog.youtubeUrlLabel')" type="text"></v-text-field>
            <!-- <v-text-field :label="$t('navigationDrawer.dialog.languageLabel')" type="text"></v-text-field> -->
             <v-select v-model="video.language" :items="languages"  :label="$t('navigationDrawer.dialog.chooseLangLabel')"></v-select>
          </v-card-text>
          <!-- <v-divider></v-divider> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="addVideo()"
            >
              {{$t('navigationDrawer.dialog.addLabel')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
import axios from 'axios'
import ActionTypes from '@/plugins/store/types.js'
export default {
  name: 'addVideoDialog',
  props: [
    'value'
  ],
  data () {
    return {
      languages: ['ENG', 'CHN'],
      video: {}
    }
  },
  computed: {
    isDisplay: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    addVideo: function () {
    //   console.log('addVideo invoked...')
      axios({
        method: 'POST',
        'url': '/api/addVideo',
        'data': this.video
      }).then((response) => {
        console.log('Add video successful!')
        console.log(response.data)
        this.$store.dispatch(ActionTypes.ADD_VIDEO, {video: response.data})
      },
      (error) => {
        console.log(error)
      })
      this.closeDialog()
      this.resetModel()
    },
    resetModel: function () {
      this.video = {}
    }
  }
}
</script>
