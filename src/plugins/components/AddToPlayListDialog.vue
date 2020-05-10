<template>
    <v-dialog v-model="isDisplay" width="400" persistent>
            <v-card>
                <v-card-title
                    class="headline primary pb-1 pt-1"
                    primary-title
                >
                    <v-spacer>{{title}}</v-spacer>
                    <v-icon @click="closeDialog">close</v-icon>
                </v-card-title>
               <v-card-text >
                   <h3>
                    {{message}}
                   </h3>
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
export default {
    props: {
        message: {
            type: String
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            isDisplay: true,
            value: null
        }
    },
    methods: {
        closeDialog() {
            this.isDisplay = false
            this.value = false;
            this.$destroy()
        },
        choose(value){
            this.value = value
            this.$destroy()
        }
    }
}
</script>

<style>

</style>
