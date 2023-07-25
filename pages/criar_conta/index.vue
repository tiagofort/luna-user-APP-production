<template>
    <v-container class="fundo">
        <UserRegistration textoBotao="Create" :submeterForm="salvarUsuario" />
    </v-container>
</template>

<script>
import UserRegistration from '~/components/UserRegistration.vue';
export default {
  data: () => ({
        
  }),
     components:{
      UserRegistration
  },
     methods:{
        async salvarUsuario(usuInfo){
            await this.$axios
                            .$post(`/usuario/salvar_cliente`, {
                               nome: usuInfo.nome,
                               sobrenome: usuInfo.sobrenome,
                               email: usuInfo.email,
                               phone: usuInfo.phone,
                               senha: usuInfo.senha,
                               avatar: usuInfo.avatar
                            })
                            .then((response) => {
                              console.log("Success");
                              this.$notifier.showMessage({ content: 'Account created! We send a confirmation link to the email used for registration. Please click on the link and confirm your registration.', color: 'green', time: 4000 });
                              this.$router.push({
                                 name: "index",
                              });
                            })
                            .catch((error) => {
                              console.log(error);
                              this.$notifier.showMessage({ content: 'Something went wrong! Please, refresh the page and try again!', color: 'green', time: 2000 });
                            });
            }
     }
}


</script>

<style>
.fundo {
  background-color: #ffffff;
}

</style>