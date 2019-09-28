<template>
  <v-content class="background">
    <v-container fluid>
      <v-layout row wrap  justify-center >
        <v-flex xs12 text-xs-center class=" mt-5" >
          <v-card class="elevation-0 transparent">
            <v-card-text class="font-weight-bold text-capitalize display-1  black-grey--text pr-5">
              {{$t('login.portalLoginMsg')}}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex  xs12 sm4 mt-5>
          <v-form @submit.prevent="login">
          <v-card class="elevation-12 form-transparent">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{$t('login.loginFormLable')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text >
              <v-card-text class="danger"><div>{{wasLoginFailed==true?$t('login.errorMsg'):''}}</div></v-card-text>
              <v-text-field :error-messages="errors.first('username')"
                            v-validate="'required'" prepend-icon="person" name="username" v-model="credential.username" :label="$t('login.usernameLable')" type="text" outline></v-text-field>
              <v-text-field :error-messages="errors.first('password')" id="password" v-validate="'required'" prepend-icon="lock" name="password" v-model="credential.password" :label="$t('login.passwordLable')" type="password" outline></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" @click="login">{{$t('login.loginLable')}}</v-btn>
            </v-card-actions>
          </v-card>
          </v-form>
        </v-flex>
        <v-flex xs12 text-xs-center>
          <!--footer-->
        </v-flex>
      </v-layout>

    </v-container>

  </v-content>
  <!--</v-parallax>-->
</template>

<script>
import ActionTypes from '@/plugins/store/types.js'
import axios from 'axios'
export default {
  components: {},
  data: () => ({
    credential: {},
    wasLoginFailed: null
  }),
  props: {
    source: String
  },
  computed: {
    // isLoginSuccess: {
    //   get: function () {
    //     return this.$store.state.isLoginSuccess
    //   }
    // }
  },
  methods: {
    login: function () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const formData = new URLSearchParams()
          formData.append('username', this.credential.username)
          formData.append('password', this.credential.password)
          axios({
            method: 'POST',
            'url': '/api/login',
            'data': formData.toString(),
            'headers': {'content-type': 'application/x-www-form-urlencoded'}
          }).then((response) => {
            console.log('login successful!')
            this.wasLoginFailed = false
            this.$store.dispatch(ActionTypes.UPDATE_LOGIN_STATUS, {status: true})
            this.$store.dispatch(ActionTypes.SAVE_JWT, {'jwtToken': response.data.jwtToken})
            this.$router.push('/home')
          },
          (error) => {
            console.log(error)
            this.wasLoginFailed = true
          })
        } else {
          console.log('Validation failed...')
        }
      })
    }
  }

}
</script>

<style scoped>
  .background {
    background-image: url("../assets/image/login.jpg");
    background-size: cover;
    /*background-repeat: no-repeat;*/
  }

  .form-transparent {
    background-color: white;
    opacity: 0.85;
    /*border-color: transparent!important;*/
  }
  .danger {
    color: red;
    font-size: large;
  }
</style>
