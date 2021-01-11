<template>
    <v-dialog v-model="isDisplay" width="400" persistent>
            <v-card>
                <v-card-title
                    class="headline primary pb-1 pt-1"
                    primary-title
                >
                    <v-spacer>{{video.name}}</v-spacer>
                    <v-icon @click="closeDialog">close</v-icon>
                </v-card-title>
               <v-card-text class="secondary">
                    <v-layout column wrap>
                        <!-- <span><router-link  to="/home" class="" >{{$t('videoAction.deleteLabel')}}</router-link></span><br>
                        <span><router-link  to="/home" class="" >{{$t('videoAction.editLabel')}}</router-link></span><br> -->
                        <v-btn class="grey" @click="onDeleteVideo()">{{$t('videoAction.deleteLabel')}}</v-btn>
                        <v-btn class="grey" @click="onEditVideo()">{{$t('videoAction.editLabel')}}</v-btn>
                        <!-- <v-btn class="grey" @click="onAddToPlayList()">{{$t('videoAction.addToPlayListLabel')}}</v-btn> -->
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </v-layout>
               </v-card-text>
            </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        parent: {
            type: Object
        },
        video: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    data() {
        return {
            isDisplay: true
        }
    },
    methods: {
        closeDialog() {
            this.action = "Closed"
            this.$destroy()
        },
        onDeleteVideo() {
            let message = this.$t('videoAction.message.areyouSureToDelete')
            this.closeDialog();
            this.$confirmDialog(
                {message: message,title: this.video.name})
                .then(
                (response) => {
                    if(response.confirmed && response.confirmed === true)
                        this.deleteVideo(this.video.videoId)
                } 
            )
        },
        onEditVideo(){
            this.closeDialog();
            console.log('hello')
            this.$editVideoDialog({video: this.video}).then(
                (response) => {
                    console.log('updatedVideo: '+response.data)
                    this.updateVideo(response.data)
                }
            )
        },
        onAddToPlayList(){
           let message = this.$t('videoAction.message.areyouSureAddToPloayList')
            this.closeDialog();
            this.$confirmDialog(
                {message: message,title: this.video.name})
                .then(
                (response) => {
                    if(response.confirmed && response.confirmed === true)
                        this.addToPlayList(this.video)
                } 
            )
        }
    }
}
</script>

<style>

</style>
