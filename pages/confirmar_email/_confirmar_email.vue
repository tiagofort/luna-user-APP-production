<template>
    <v-container class="fundo mt-5">
        <v-row class="mt-5">
            <v-col></v-col>
            <v-col class="text-center">
                <span class="texts text-h5">Thansk for confirming your email!</span><br>
                <span class="texts text-h5">Click on the button to go to the Login Page</span><br>
                <button color="#b86935" class="mt-5 custom-btn btn" @click="redirecionar()">Login</button>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  data: () => ({
        
  }),
     methods:{
        redirecionar(){
            this.$router.push({
                name: "login",
            });
        },
        async confirmarEmail(){
            var email = window.location.href.split('=')[1];
            await this.$axios
                            .$put(`/usuario/confimar_email`, {
                               email: email
                            })
                            .then((response) => {
                              console.log("Success");
                            })
                            .catch((error) => {
                              console.log(error);
                              this.$notifier.showMessage({ content: 'Something went wrong! Please, refresh the page and try again!', color: 'green', time: 2000 });
                            });
        }
     },
     mounted(){
        this.confirmarEmail();
     }
}
</script>

<style>

.fundo {
  background-color: #FFFFFF;
}

.texts {
    color: #b86935;
}

.custom-btn {
  width: 130px;
  height: 50px;
  color: #ffffff;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
}

.btn {
  background: #b86935;
  border: 2px solid #b86935;;
  z-index: 1;
}

.btn:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.btn:hover {
  color: #b86935;
  border: 1px solid #b86935;
}

.btn:hover:after {
  left: 0;
  width: 100%;
}

.btn:active {
  top: 2px;
}
</style>