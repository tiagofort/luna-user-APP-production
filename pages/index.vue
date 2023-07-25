<template>
  <div>
    <MainBanner /> 
    <v-container fluid class="text-center px-0">
            <v-container :max-width="getMaxWidth" class="text-center fundo">
                <v-row justify="center" class="mb-5">
                      <v-col>
                            <v-sheet class="pa-1 text-center">
                                <Items />
                            </v-sheet>
                      </v-col>
                </v-row> 
                <v-row class="mb-5 pa-5" align="center" justify="center">
                      <v-col xs="12" sm="12" md="12" lg="4" class="d-flex justify-center align-center">
                            <v-sheet class="pa-1 hidden-xs-only">
                                <p class="text-center text-lg-h5 font-title mb-n1 line-title">Featured</p>
                                <Featured />
                            </v-sheet>   
                      </v-col>
                      <v-col xs="12" sm="12" md="12" lg="4" class="hidden-sm-and-up">
                            <v-sheet class="pa-1">
                                <p class="text-center text-lg-h5 font-title mb-n1 line-title ">Featured</p>
                                <Featured />
                            </v-sheet>   
                      </v-col>
                      <v-col xs="12" sm="12" md="12" lg="8" class="d-flex justify-center align-center">
                            <v-sheet class="pa-1 ml-2">
                                <p class="text-center text-lg-h5 font-title line-title ">Stones</p>
                                <Stones />
                            </v-sheet>          
                      </v-col>  
                </v-row>
            </v-container> 
    </v-container>
  </div>
</template>

<script>
import img from '@/static/general/comingSoon.png';
import MainBanner from '../components/MainBanner.vue';
import Items from '../components/Items.vue';
import Featured from '../components/Featured.vue';
import Stones from '../components/Stones.vue';

export default {
  data () {

    return {

      slide: [],
      novidades: [],
      maisVendidos: [],
      model: null,
      imagem: img
    
    }
  
  },

  components: { MainBanner, Items, Featured, Stones },

  computed:{

    getMaxWidth (){
      return this.$vuetify.breakpoint.width - (this.$vuetify.breakpoint.width * 0.2);
    }

  },

  mounted() {

    this.initializeSlides();

    this.initializeNovidades();

    this.topVendaProdQtd();

  },

  methods:{

    initializeSlides() {
      this.$axios
          .get("/slide/buscarSlides")
          .then((response) => (this.slide = response.data));
    },

    initializeNovidades(){
      this.$axios
          .get("/item/buscarNovidades")
          .then((response) => (this.novidades = response.data));
    },

    topVendaProdQtd() {
      this.$axios
         .get(`/venda/topProdQtd/0`)
         .then((response) => {
                  this.maisVendidos = response.data});
    },

    carregarItem(id) {
      this.$router.push({
          name: "accessories-acessories",
          params: { acessories: id },
      });
    },

    carregarProduto(id){
      this.$router.push({
          name: "accessories-acessories",
          params: { acessories: id },
      });
    },

  }
  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

.fundo {
  background-color: #ffffff;
}

.texts {
  color: #b86935;
}

.font-title{
  font-family: 'Lato', sans-serif;
  color: #b86935;
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
