<template>
    <v-dialog v-model="isDisplay" width="500" persistent>
        <v-card>
          <v-card-title
            class="headline primary "
            primary-title
          >
            {{$t('navigationDrawer.editVideoLabel')}}
            <v-spacer></v-spacer>
            <v-icon @click="closeDialog">close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="updatedVideo.name" :label="$t('navigationDrawer.dialog.videoTitleLabel')" type="text"></v-text-field>
            <v-text-field v-model="updatedVideo.performedBy" :label="$t('navigationDrawer.dialog.videoByLabel')" type="text"></v-text-field>
            <v-text-field v-model="updatedVideo.youtubeLink" :label="$t('navigationDrawer.dialog.youtubeUrlLabel')" type="text"></v-text-field>
            <!-- <v-text-field :label="$t('navigationDrawer.dialog.languageLabel')" type="text"></v-text-field> -->
             <v-select v-model="updatedVideo.language" :items="languages"  :label="$t('navigationDrawer.dialog.chooseLangLabel')"></v-select>
          </v-card-text>
          <!-- <v-divider></v-divider> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="onClick()"
            >
              {{$t('common.label.update')}}
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
  props: {
    video: {
      type: Object,
      default: {}
    }
  },
  beforeMount: function(){
    this.updatedVideo = this.clone(this.video)
  },
  data () {
    return {
      languages: ['ENG', 'CHN'],
      updatedVideo: {},
      isDisplay: true
    }
  },
  computed: {
    // isDisplay: {
    //   get: function () {
    //     return this.value
    //   },
    //   set: function (val) {
    //     this.$emit('input', val)
    //   }
    // }
  },
  methods: {
    onClick: function () {
      this.isDisplay=false
      this.$destroy()
    },
    resetModel: function () {
      this.video = {}
    }
  }
}
</script>
