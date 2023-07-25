<template>
  <v-container fluid class="text-center pa-3 mr-n2 mt-n8 mb-15">
      <v-container :max-width="getMaxWidth" class="text-center fundo">
              <v-row justify="center" class="mb-5">
                    <v-col>
                        <ViewAll />
                    </v-col>
               </v-row> 
      </v-container>
  </v-container>
</template>

<script> 
import ViewAll from '~/components/ViewAll.vue';
export default {
  data () {
      return {
      render: 0,  
      itens: [],
      itens_temp: [],
      overlay: false,
      pedras: [],
      selecao_pedras: [],
      materiais: [],
      selecao_materiais: [],
      tipos: [],
      selecao_tipos: [],
      valores: [],
      selecao_valores: [],
      indice: 0
      }
  },
  components:{ ViewAll },
  mounted() {
    this.getItens()
    this.getCadProd();
  },
  computed:{
      getMaxWidth (){
        return this.$vuetify.breakpoint.width - (this.$vuetify.breakpoint.width * 0.2);
      }
  },
  methods:{
   renderizar(){
      this.render += 1;
   }, 
   getItens (){
    this.$axios
          .get("/item/buscarPorParamentro/all")
          .then((response) => (this.itens = response.data));
   },
   getCadProd() {
        this.$axios.get("/cadastros/buscaCadProd").then((response) => {
            this.tipos = response.data.balde1;
            this.materiais = response.data.balde2;
            this.pedras = response.data.balde3;
            this.valores = response.data.balde4;
        });
    },
    carregarProduto(id) {
      this.$router.push({
          name: "accessories-acessories",
          params: { acessories: id },
      });
    },
  }         
}
</script>


<style>

.fundo {
  background-color: #ffffff;

}
.img {
  background-color: #071936;
}

</style>

