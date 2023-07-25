<template>
    <v-container class="fundo" color="#0b0418">
      <Authentication class="mb-5" textoBotao="Login" :submeterForm="logarUsuario"/>
    </v-container>
</template>

<script>
import Authentication from '~/components/Authentication.vue';

export default {
  data: () => ({}),
  components:{
    Authentication
  },
  methods:{
      async logarUsuario(loginInfo){
        await this.$auth.loginWith('local', {
            data: loginInfo
        }).then(response => {
            this.$notifier.showMessage({ content: 'Welcome! Thanks for logged in', color: 'green', time: 2000 })
        }).catch(error => {
          if (error.response) {
              const errorMessage = error.response.data.message;
              this.$notifier.showMessage({ content: errorMessage, color: 'red', time: 2000 });
          }
        });  
      }
  }
}

</script>
<style>
.fundo{
    background-color: #ffffff;
}

</style>