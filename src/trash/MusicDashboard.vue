<template>
  <v-content class="background">
    <navigation-comp></navigation-comp>
    <v-container fluid  >
      <v-layout row wrap>
        <v-flex  xs12 >
          <div class="spaceHolder">
            <header-comp></header-comp>
          </div>
        </v-flex>
        <v-flex v-for="i in 7" :key="`4${i}`" xs4 class="pr-1 pb-1">
          <v-card >
            <v-layout >
              <v-flex xs7 class="video-bg-color">
                  <v-layout class="">
                  <!-- <v-card class="elevation-10 transparent  " width="225px" height="120px" color="green"> -->
                      <iframe width="225px" height="120px" src="https://www.youtube.com/embed/52nfjRzIaj8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/aJOTlE1K90k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
                  <!-- </v-card> -->
                  </v-layout>
              </v-flex>
              <v-flex xs5 class="video-bg-color">
                <!-- <v-img
                    class="white--text"
                    height="200px"
                    :src="imgUrl"
                  >
                  </v-img> -->
                <v-layout row wrap justify-center class="">
                <div><h3>I will never love again</h3></div>
                <div> by Lady Gaga, Bradly Cooper</div>
                </v-layout>
                <!-- <v-card>
                  <v-img
                    class="white--text"
                    height="200px"
                    :src="imgUrl"
                  >
                  </v-img>
                </v-card> -->
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
export default {
  name: 'Home',
  components: {HeaderComp, NavigationComp},
  data: () => (
    {
      imgUrl: require('../assets/image/ladygaga.jpg')
    }
  ),
  beforeMount: function () {
    console.log(this.$store.state)
  },
  data () {
    return {
      items: [
        { title: this.$t('navigationDrawer.addNewVideoLabel'), icon: 'add' }
      ]
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
