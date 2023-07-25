<template>
    <v-container class="mt-n10 fundo" id="login-page">
        <v-row class="d-flex justify-center" no-gutters>
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
                <v-card class="mx-auto mb-5 mt-n1 px-6 py-8 rounded-b-xl" width="450">
                    <v-form v-model="valido">
                        <v-text-field
                          outlined
                          v-model="usuInfo.email"
                          append-icon="mdi-account"
                          :rules="[required('email'), emailFormat()]"
                          class="mb-2"
                          clearable
                          label="Email"    
                        ></v-text-field>
  
                        <v-text-field
                          outlined
                          v-model="usuInfo.senha"
                          :append-icon="mostrarSenhar ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="mostrarSenhar ? 'text' : 'password'"
                          :rules="[required('password')]"
                          @click:append="mostrarSenhar = !mostrarSenhar"
                          clearable
                          counter=true
                          label="Password"
                        ></v-text-field>

                        <v-row class="justify-end">
                          <v-btn @click="redefinirSenha()" text plain small class="white blue--text">Forgot your password?</v-btn>
                        </v-row>

                        <br>
  
                        <v-btn
                          :disabled="!valido"
                          @click="submeterForm(usuInfo)"
                          block
                          color="primary"
                          size="large"
                        >
                          {{textoBotao}}
                        </v-btn>
                        <v-btn
                           class="mt-2"
                           block
                           color="yellow accent-4"
                           size="large"
                           @click="criarUsuario"
                           >
                          Create Account
                        </v-btn>
                     </v-form>
                </v-card>
            </v-sheet>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">Request to change password</span>
                </v-card-title>
                <v-form v-model="valido">
                  <v-card-text>
                    <v-container>
                      <v-row>    
                          <span class="mb-3 ml-1 text-body-1">A link will be sent to your email to proceed with your password change request.</span>      
                          <v-text-field v-model="email_recuperacao" :rules="[required('Email'), emailFormat()]" outlined label="Insert your email"></v-text-field>   
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red darken-1"
                      text
                      @click="dialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      :disabled="!valido"
                      color="blue darken-1"
                      text
                      @click="enviarEmail()"
                    >
                      Send
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>  
            </v-dialog>    
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
import validacao from '@/utils/validacao';
import logo from "~/static/general/logoLuna.svg";

export default {
    data() {
      return{
          dialog: false,
          valido: false,
          imgLogo: logo,
          valido: false,
          email_recuperacao: "",
          mostrarSenhar: false,
          usuInfo: {
              email: '',
              senha: ''
          },
          ...validacao
      }
    },

    methods:{

      redefinirSenha(){
        this.dialog = true;
      },
        
      enviarEmail(){
        this.$axios.post('/usuario/esqueceu_senha', {
            email: this.email_recuperacao 
        }).then((response) => {
            this.dialog = false;
            this.email_recuperacao = "";
            this.$notifier.showMessage({ 
                content: 'A link has been sent to your email address. Please check your inbox to proceed with password change.', 
                color: 'green', 
                time: 2000 
            });

            this.$router.push({
              name: "login",
            });

        }).catch((error) => {
            this.dialog = false;
            this.email_recuperacao = "";
            this.$notifier.showMessage({ 
                content: error.response.data.message, 
                color: 'red', 
                time: 2000 
            });
        });
      },

      criarUsuario(){
        this.$router.push({
          name: "criar_conta",
        });
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