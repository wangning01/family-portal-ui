 /* eslint-disable */
<template>
  <v-content class="background">
    <v-container fluid text-xs-center>
      <v-layout row wrap>
        <v-flex  xs12 md12>
          <div class="spaceHolder">
            <header-comp></header-comp>
          </div>
        </v-flex>
        <v-flex  xs12 md12>
          <v-layout align-center  row fill-height>
            <v-flex xs2 class="" ml-2>
              <v-layout justify-center>
                <v-card class="elevation-10 transparent v-card--hover hvr-grow" width="225px" height="120px" color="green">
                  <!-- <v-card-text class="font-weight-bold text-capitalize display-1 mt-5 "> -->
                    <iframe width="225px" height="120px" src="https://www.youtube.com/embed/52nfjRzIaj8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  <!-- </v-card-text> -->
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex xs2 ml-2>
              <v-layout justify-center>
                <v-card to="/music"  class="elevation-0 transparent v-card--hover hvr-grow" width="225px" height="120px" color="yellow">
                  <v-card-text class="font-weight-bold text-capitalize display-1 mt-5">
                    {{$t('Music')}}
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex xs2 ml-2>
              <v-layout justify-center>
                <v-card to="/music"  class="elevation-0 transparent v-card--hover hvr-grow" width="225px" height="120px" color="yellow">
                  <v-card-text class="font-weight-bold text-capitalize display-1 mt-5">
                    {{$t('Music')}}
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex xs2 ml-2>
              <v-layout justify-center>
                <v-card to="/music"  class="elevation-0 transparent v-card--hover hvr-grow" width="225px" height="120px" color="yellow">
                  <v-card-text class="font-weight-bold text-capitalize display-1 mt-5">
                    {{$t('Music')}}
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex xs2 ml-2>
              <v-layout justify-center>
                <v-card to="/music"  class="elevation-0 transparent v-card--hover hvr-grow" width="225px" height="120px" color="yellow">
                  <v-card-text class="font-weight-bold text-capitalize display-1 mt-5">
                    {{$t('Music')}}
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex xs2 ml-2>
              <v-layout justify-center>
                <v-card to="/music"  class="elevation-0 transparent v-card--hover hvr-grow" width="225px" height="120px" color="yellow">
                  <v-card-text class="font-weight-bold text-capitalize display-1 mt-5">
                    {{$t('Music')}}
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>

import HeaderComp from '@/components/common/HeaderComp.vue'
export default {
  name: 'Home',
  components: {HeaderComp},
  beforeMount: function () {
    console.log(this.$store.state)
  }
}
</script>

<style scoped>
  .background {
    /*background-image: url("../assets/image/home.jpg");*/
    background-size: cover;
  }
  .spaceHolder {
    height: 150px;
  }
  .resultContainer {
    height: 350px;
  }
</style>
