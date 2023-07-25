<template>
    <v-container>
        <v-row>
          <v-col align-self="center">
            <p class="font-title line-title">What is new?</p>
          </v-col>
        </v-row>
      <v-row>
        <v-col
          v-for="(item,i) in sliceItens"
          :key="i"
          :id="item._id"
          class="d-flex justify-center child-flex"
          :cols="getCols"
        >
          <v-sheet max-width="350">
              <v-hover>
                <template v-slot:default="{ hover }">  
                  <a>
                      <v-img
                        :src="hover? item.midia.url2 : item.midia.url1"
                        aspect-ratio="1"
                        max-width="350"
                        max-height="450"
                        class="grey lighten-2"
                        @click="openItem(item._id)"
                      ></v-img>
                  </a>  
                </template>
              </v-hover>
              <a @click="openItem(item._id)"><p class="font-texts text-left mt-2">{{ item.titulo + ' - ' + item.pedra }}</p></a>
              <p class="text-left mt-n2">{{ item.preco+'€' }}</p>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
          <v-col align-self="center">
              <button @click="openItens('all')" color="#b86935" class="custom-btn btn">VIEW ALL</button>
          </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      aspectRatio: 2 / 1,
      novidades: []
    };
  },

  methods: {

    initializingItens(){
      this.$axios
        .get("/item/buscarNovidades")
        .then((response) => (this.novidades = response.data));
    },

    openItens(param){
      this.$router.push({
        name: "view_all-all",
        params: { all: param },
      });
    },

    openItem(id){
      this.$router.push({
        name: "accessories-acessories",
        params: { acessories: id },
      });
    }

  },

  computed:{

    getMaxWidth() {
      return this.$vuetify.breakpoint.width; 
    },

    getCols(){
      return this.$vuetify.breakpoint.mdAndUp ? 3 : 6;
    },

    sliceItens(){
      return this.novidades.slice(0,8);
    }
  
  },
  
  mounted() {
    this.initializingItens();
  }

};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

.font-title{
  font-family: 'Lato', sans-serif;
  font-size: 25px;
  color: #b86935;
}

.font-texts {
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  color: #b86935;
}

@media (max-width: 300px) {
  font-texts {
    font-size: 12px; /* Adjust the font size as needed */
  }
}

a {
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

.line-title {
  background-image: linear-gradient(
    to right,
      #b86935,
      white 35%,
      white 65%,
      #b86935
  );
  background-repeat: no-repeat;
  background-size: 100% 2px;
  background-position: 0 center;
}

</style>