<template>
    <v-container class="mt-n15 fundo" id="login-page">
        <v-row class="d-flex justify-center mb-15" no-gutters>
          <v-col
              cols="4"
              sm="2"
              class="hidden-sm-and-down"
            ></v-col>
          <v-col
              cols="12"
              sm="8"
              align-self="center"
          >
            <v-sheet
                min-height="70vh"
                rounded="lg"
                class="fundo"
            >
              
                <v-img width="450" aspect-ratio="16/9" :src="imgLogo" id="logo-image" class="white rounded-t-xl"></v-img>
                <v-card class="mx-auto mt-n4 px-6 py-8 rounded-b-xl mb-10" width="450">
                    <v-form v-model="valido">

                        <v-file-input
                          v-model="usuInfo.img"
                          label="Avatar"
                          outlined
                          accept="image/png, image/jpeg, image/bmp"
                          prepend-icon="mdi-camera"  
                          :rules="[value => !value || value.size < 3000000 || 'Avatar size should be less than 3 MB!',]"
                          show-size
                        ></v-file-input>

                        <v-text-field
                          outlined
                          v-model="usuInfo.nome"
                          :rules="[required('Name')]"
                          class="mb-1"
                          clearable
                          label="Name"    
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="usuInfo.sobrenome"
                          :rules="[required('Surname')]"
                          class="mb-1"
                          clearable
                          label="Surname"    
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="usuInfo.email"
                          :rules="[required('Email'), emailFormat()]"
                          class="mb-1"
                          clearable
                          label="Email"  
                          v-on:blur="verificarEmail()"  
                        ></v-text-field>
                        <v-row v-if="verificacaoEmail == '0'" class="justify-end mb-3 mr-3">
                            <span class="red--text">The email informed is already registered.</span>
                        </v-row>

                        <v-text-field
                          outlined
                          v-model="usuInfo.phone"
                          :rules="[required('Phone')]"
                          class="mb-1"
                          clearable
                          label="Phone"   
                        ></v-text-field>
  
                        <v-text-field
                          class="mb-1"
                          outlined
                          v-model="usuInfo.senha"
                          :append-icon="mostrarSenhar1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="mostrarSenhar1 ? 'text' : 'password'"
                          :rules="[required('Password'), minLength('Password', 8)]"
                          @click:append="mostrarSenhar1 = !mostrarSenhar1"
                          clearable
                          counter=true
                          label="Password"
                        ></v-text-field>

                        <v-text-field
                          class="mb-1"
                          outlined
                          v-model="usuInfo.senha2"
                          :append-icon="mostrarSenhar2 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="mostrarSenhar2 ? 'text' : 'password'"
                          :rules="[required('Password'), passwordEqual(usuInfo.senha, usuInfo.senha2)]"
                          @click:append="mostrarSenhar2 = !mostrarSenhar2"
                          clearable
                          counter=true
                          label="Confirm Passwrod"
                        ></v-text-field>

                        <br>
  
                        <v-btn
                          :disabled="!valido"
                          @click="efetuarCadastro(usuInfo)"
                          block
                          color="primary"
                          size="large"
                        >
                          {{textoBotao}}
                        </v-btn>
                     </v-form>
                </v-card>
            </v-sheet>
          </v-col>
          <v-col 
              cols="4" 
              sm="2" 
              class="hidden-sm-and-down"
          ></v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import validacao from '~/utils/validacao';
import logo from "~/static/general/logoLuna.svg";
export default {
      data() {
        return{
            dialog: false,
            valido: false,
            imgLogo: logo,
            valido: false,
            mostrarSenhar1: false,
            mostrarSenhar2: false,
            verificacaoEmail: '',
            usuInfo: {
                nome: '',
                sobrenome: '',
                usuario: '',
                email: '',
                phone: '',
                senha: '',
                senha2: '',
                avatar: '',
                img: null
            },
            ...validacao
        }
      },

      methods:{

        verificarEmail(){
          if(this.usuInfo.email != ''){  
            this.$axios
                .get(`/usuario/verificar_email/${this.usuInfo.email}`)
                .then((response) => {
                    this.verificacaoEmail = response.data;
                }).catch((error) => {
                    console.log(error);
                });
          }     
        },

        async efetuarCadastro(){
            await this.salvarAvatar();
            await this.submeterForm(this.usuInfo);
        },

        async salvarAvatar(){
            if (this.usuInfo.img != null) {
                var formData = new FormData();
                formData.append("avatar", this.usuInfo.img);
                await this.$axios
                          .post("/envio_avatar/salvar", formData)
                          .then((response) => {
                               this.setURL(response.data);
                          })
                          .catch((error) => {
                                console.log({ error });
                          });
            }
        },

        setURL(u){
            this.usuInfo.avatar = u != "" ? u : "";
        }

      },

      props: ["submeterForm", "textoBotao"]
}  
</script>

<style scoped>

#login-page {
    margin-top: 10px;
    width: 100%;
}

#logo-image {
  margin-left: auto;
  margin-right: auto;
}

.fundo{
  background-color: #ffffff;
}
  
</style>