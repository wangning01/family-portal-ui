<template>
  <v-toolbar app color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text" >
      <router-link  to="/home" class="white--text " >{{$t('header.homeLabel')}}</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="signOut">
      <v-icon class="fas fa-sign-out-alt" ></v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
import ActionTypes from '@/plugins/store/types.js'
export default {
  name: 'headerComp',
  methods: {
    signOut: function () {
      this.$store.dispatch(ActionTypes.CLEAR_AUTH_DATA)
      // console.log(this.$store.state)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

</style>
