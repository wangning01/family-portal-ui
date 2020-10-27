<template>
    <v-dialog v-model="isDisplay" width="400" persistent>
            <v-card>
                <v-card-title
                    class="headline primary pb-1 pt-1"
                    primary-title
                >
                    <v-spacer>Add to List: <b>{{list.name}}</b></v-spacer>
                    <v-icon @click="closeDialog">close</v-icon>
                </v-card-title>
               <v-card-text >
                   
                   <v-layout row wrap>
                       <v-flex v-for="(video, index) in videoNotInList" :key="video.videoId" xs12>
                           <v-layout>
                               <v-flex xs9>
                                <yt-player :yturl="video.youtubeLink" ref="yt" :width="250" :height="120" :playerVars="playerVars"></yt-player>
                               </v-flex>
                               <v-flex xs3>
                                   <v-checkbox v-model="videosToAdd" :value="video"></v-checkbox>
                               </v-flex>
                           </v-layout>
                       </v-flex>
                   </v-layout>

               </v-card-text>
               <v-card-actions >
                   <v-layout justify-end>
                   <v-btn color="info"  @click="choose(true)" small>{{$t("common.label.OK")}}</v-btn>
                   <v-btn color="info"  @click="choose(false)" small>{{$t("common.label.CANCEL")}}</v-btn>
                   </v-layout>
               </v-card-actions>
            </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        list: {
            type: Object
        }
    },
    data() {
        return {
            isDisplay: true,
            value: null,
            playerVars: {
                origin: 'https://localhost:8080',
                enablejsapi: 1
            },
            videoNotInList: [],
            videosToAdd: []
        }
    },
    beforeMount: function(){
        axios({
            method: 'POST',
            'url': '/api/videosNotInPlaylist',
            data: this.list
        }).then((response) => {
            // console.log('videoNotInList:')
            // console.log(response.data)
            this.videoNotInList = response.data
            // this.$store.dispatch(ActionTypes.UPDATE_VIDEOS, {videos: response.data})
        },
        (error) => {
            console.log(error)
        });
    },
    methods: {
        closeDialog() {
            this.isDisplay = false
            this.value = false;
            this.$destroy()
        },
        choose(value){
            this.value = value
            if(!value) this.videosToAdd = []
            this.$destroy()
        }
    }
}
</script>

<style>

</style>
