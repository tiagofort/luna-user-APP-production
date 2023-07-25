<template>
    <v-sheet class="mt-10" height="auto">
            <v-row>   
                    <v-col xs="12" sm="12" md="6" lg="3" xl="3">
                        <v-card width="390" height="680" class="hidden-sm-and-down pa-2">
                            <div class="text-center texts line-title text-h6">Filters</div>
                            <v-card-title class="text-left subtitle-1 texts">Stones</v-card-title>
                            <v-combobox
                                :items="pedras"
                                v-model="selectPedra"
                                label="Select an option"
                                color="#b86935"
                                dense
                                solo
                            ></v-combobox>
                            <v-card-title class="text-left subtitle-1 texts">Type</v-card-title>
                            <v-combobox
                                :items="tipos"
                                v-model="selectTipo"
                                label="Select an option"
                                dense
                                solo
                            ></v-combobox>
                            <v-card-title class="text-left subtitle-1 texts">Material</v-card-title>
                            <v-combobox
                                :items="materiais"
                                v-model="selectMaterial"
                                label="Select an option"
                                dense
                                solo
                            ></v-combobox>
                            <v-card-title class="text-left subtitle-1 texts">Price</v-card-title>
                            <v-combobox
                                :items="valores"
                                v-model="selectPreco"
                                label="Select an option"
                                dense
                                solo
                            ></v-combobox>
                            <v-divider></v-divider>
                            <v-btn block color="#b86935" class="white--text mb-3" @click="filters()">Filter</v-btn>
                            <v-btn block color="#b86935" class="white--text" @click="cleanFilter()">Clean</v-btn>   
                        </v-card>
                        <v-card :width="getWidth" class="hidden-md-and-up">
                            <v-expansion-panels v-model="isOpen" accordion>
                                <v-expansion-panel @click="itemsVisibility()">
                                    <v-expansion-panel-header class="texts">Filters</v-expansion-panel-header>
                                    <v-expansion-panel-content class="pb-2">
                                        <v-card-title class="text-left subtitle-1 texts mb-n5">Stones</v-card-title>
                                            <v-combobox
                                                :items="pedras"
                                                v-model="selectPedra"
                                                label="Select an option"
                                                dense
                                                solo
                                            ></v-combobox>
                                            <v-card-title class="text-left subtitle-1 texts mb-n5 mt-3">Type</v-card-title>
                                            <v-combobox
                                                :items="tipos"
                                                v-model="selectTipo"
                                                label="Select an option"
                                                dense
                                                solo
                                            ></v-combobox>
                                            <v-card-title class="text-left subtitle-1 texts mb-n5 mt-3">Material</v-card-title>
                                            <v-combobox
                                                :items="materiais"
                                                v-model="selectMaterial"
                                                label="Select an option"
                                                dense
                                                solo
                                            ></v-combobox>
                                            <v-card-title class="text-left subtitle-1 texts mb-n5 mt-3">Price</v-card-title>
                                            <v-combobox
                                                :items="valores"
                                                v-model="selectPreco"
                                                label="Select an option"
                                                dense
                                                solo
                                            ></v-combobox>
                                            <v-btn block color="#b86935" class="white--text mb-3" @click="filters()">Filter</v-btn>
                                            <v-btn block color="#b86935" class="white--text" @click="cleanFilter()">Clean</v-btn>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-card>
                    </v-col>
                    <v-col xs="6" sm="12" md="6" lg="9">
                        <v-row v-if="show === true" class="pa-2" justify="start" align="start" :key="render">       
                                <v-col 
                                    v-for="(item,i) in paginatedItems"
                                    :key="i"
                                    :id="item._id"
                                    class="d-flex justify-start child-flex"
                                    align-self="start"
                                    :cols="getCols"
                                >
                                    <v-sheet max-width="200">
                                    <v-hover>
                                        <template v-slot:default="{ hover }">  
                                        <a>
                                            <v-img
                                            :src="hover? item.midia.url2 : item.midia.url1"
                                            aspect-ratio="1"
                                            max-width="200"
                                            max-height="350"
                                            class="grey lighten-2"
                                            @click="openItem(item._id)"
                                            >
                                            </v-img>
                                        </a>  
                                        </template>
                                    </v-hover>
                                    <a @click="openItem(item._id)"><p class="texts text-left mt-2">{{ item.titulo + ' - ' + item.pedra }}</p></a>
                                    <p class="text-left mt-n2">{{ item.preco+'€' }}</p>
                                    </v-sheet>
                                </v-col>
                        </v-row>
                    </v-col>               
            </v-row>
            <v-row justify="center" align="center">
                <v-pagination
                    color="#b86935"
                    v-model="currentPage"
                    :length="totalPages"
                    @input="updatePage"
                ></v-pagination>
            </v-row>
    </v-sheet>           
</template>

<script> 
export default {
  data () {
      return {
      render: 0,  
      itens: [],
      show: true,
      backup_items: [],
      selectPedra: '',
      selectTipo: '',
      selectMaterial: '',
      selectPreco: '',
      pedras: [],
      materiais: [],
      tipos: [],
      valores: [],
      isOpen: [0],
      currentPage: 1,
      itemsPerPage: 10,
      }
  },

  async mounted() {
    await this.getItens();
    await this.getCadProd();
  },

  computed:{

      getWidth(){
        return this.$vuetify.breakpoint.width;
      },

      getMaxWidth (){
        return this.$vuetify.breakpoint.width - (this.$vuetify.breakpoint.width * 0.2);
      },

      getCols(){
        return this.$vuetify.breakpoint.mdAndUp ? 3 : 6;
      },

      paginatedItems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.itens.slice(startIndex, endIndex);
      },

      totalPages() {
        return Math.ceil(this.itens.length / this.itemsPerPage);
      },

      getPedras() {
        return this.pedras;
      } 
  },

  methods:{

   renderizar(){
      this.render += 1;
   },

   itemsVisibility(){
      this.show === true? this.show = false : this.show = true; 
   },

   async getItens (){
    let param = this.getId();
    this.$axios
        .get(`/item/buscarPorParamentro/${param}`)
        .then((response) => {
            this.itens = response.data;
            this.backup_items = response.data;
        })
   },

   async getCadProd() {
      await this.$axios.get("/cadastros/buscaCadProd").then((response) => {
            this.tipos = response.data.balde1;
            this.materiais = response.data.balde2;
            this.pedras = response.data.balde3;
            this.valores = response.data.balde4;
        });
    },

    getId() {
        return window.location.pathname.split("/")[2];
    },

    openItem(id) {
      this.$router.push({
          name: "accessories-acessories",
          params: { acessories: id },
      });
    },

    updatePage(page) {
        this.currentPage = page;
    },

    cleanFilter(){
        this.itens = this.backup_items;
        this.selectPedra = '';
        this.selectTipo = '';
        this.selectMaterial = '';
        this.selectPreco = '';
        this.isOpen = [];
        this.show = true;
    },

    filters(){
        this.isOpen = [];
        this.show = true;
        let temp = [];
        this.itens = this.backup_items;
        if(this.selectPedra !== '' && this.selectTipo === '' && this.selectMaterial === '' && this.selectPreco === ''){ 
           for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].pedra === this.selectPedra){
                    temp.push(this.itens[i]);
                }
           }
           this.itens = temp; 
        }else if (this.selectPedra !== '' && this.selectTipo !== '' && this.selectMaterial === '' && this.selectPreco === ''){ 
            for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].pedra === this.selectPedra &&
                   this.itens[i].tipo  === this.selectTipo){
                        temp.push(this.itens[i]);
                }
            }
            this.itens = temp; 
        }else if (this.selectPedra !== '' && this.selectTipo === '' && this.selectMaterial !== '' && this.selectPreco === ''){ 
            for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].pedra === this.selectPedra &&
                   this.itens[i].material  === this.selectMaterial){
                        temp.push(this.itens[i]);
                }
            }
            this.itens = temp; 
        }else if (this.selectPedra !== '' && this.selectTipo === '' && this.selectMaterial === '' && this.selectPreco !== ''){ 
            for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].pedra === this.selectPedra){
                        if(this.valores.indexOf(this.selectPreco) === 0){
                            if(parseFloat(this.itens[i].preco) < 10){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 1){
                            if(parseFloat(this.itens[i].preco) >= 10 && parseFloat(this.itens[i].preco) <= 15){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 2){
                            if(parseFloat(this.itens[i].preco) >= 16 && parseFloat(this.itens[i].preco) <= 21){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 3){
                            if(parseFloat(this.itens[i].preco) >= 22 && parseFloat(this.itens[i].preco) <= 30){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 4){
                            if(parseFloat(this.itens[i].preco) > 30){
                                temp.push(this.itens[i]);  
                            }
                        }     
                }
            }
            this.itens = temp; 
        }else if(this.selectPedra !== '' && this.selectTipo !== '' && this.selectMaterial !== '' && this.selectPreco === ''){ 
            for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].pedra === this.selectPedra &&
                   this.itens[i].tipo  === this.selectTipo  &&
                   this.itens[i].material === this.selectMaterial){
                        temp.push(this.itens[i]);
                }
            }
            this.itens = temp;
        }else if(this.selectPedra !== '' && this.selectTipo !== '' && this.selectMaterial !== '' && this.selectPreco !== ''){
            for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].pedra === this.selectPedra &&
                   this.itens[i].tipo  === this.selectTipo  &&
                   this.itens[i].material === this.selectMaterial){
                        if(this.valores.indexOf(this.selectPreco) === 0){
                            if(parseFloat(this.itens[i].preco) < 10){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 1){
                            if(parseFloat(this.itens[i].preco) >= 10 && parseFloat(this.itens[i].preco) <= 15){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 2){
                            if(parseFloat(this.itens[i].preco) >= 16 && parseFloat(this.itens[i].preco) <= 21){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 3){
                            if(parseFloat(this.itens[i].preco) >= 22 && parseFloat(this.itens[i].preco) <= 30){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 4){
                            if(parseFloat(this.itens[i].preco) > 30){
                                temp.push(this.itens[i]);  
                            }
                        }              
                }
            }
            this.itens = temp;
        }else if(this.selectPedra === '' && this.selectTipo !== '' && this.selectMaterial === '' && this.selectPreco === ''){  
           for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].tipo === this.selectTipo){
                    temp.push(this.itens[i]);
                }
           }
           this.itens = temp; 
        }else if(this.selectPedra === '' && this.selectTipo !== '' && this.selectMaterial !== '' && this.selectPreco === ''){ 
           for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].tipo === this.selectTipo &&
                   this.itens[i].material === this.selectMaterial){
                    temp.push(this.itens[i]);
                }
           }
           this.itens = temp; 
        }else if(this.selectPedra === '' && this.selectTipo !== '' && this.selectMaterial !== '' && this.selectPreco !== ''){ 
           for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].tipo === this.selectTipo &&
                   this.itens[i].material === this.selectMaterial){
                        if(this.valores.indexOf(this.selectPreco) === 0){
                            if(parseFloat(this.itens[i].preco) < 10){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 1){
                            if(parseFloat(this.itens[i].preco) >= 10 && parseFloat(this.itens[i].preco) <= 15){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 2){
                            if(parseFloat(this.itens[i].preco) >= 16 && parseFloat(this.itens[i].preco) <= 21){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 3){
                            if(parseFloat(this.itens[i].preco) >= 22 && parseFloat(this.itens[i].preco) <= 30){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 4){
                            if(parseFloat(this.itens[i].preco) > 30){
                                temp.push(this.itens[i]);  
                            }
                        }   
                }
           }
           this.itens = temp; 
        }else if(this.selectPedra === '' && this.selectTipo !== '' && this.selectMaterial === '' && this.selectPreco !== ''){
           for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].tipo === this.selectTipo){
                        if(this.valores.indexOf(this.selectPreco) === 0){
                            if(parseFloat(this.itens[i].preco) < 10){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 1){
                            if(parseFloat(this.itens[i].preco) >= 10 && parseFloat(this.itens[i].preco) <= 15){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 2){
                            if(parseFloat(this.itens[i].preco) >= 16 && parseFloat(this.itens[i].preco) <= 21){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 3){
                            if(parseFloat(this.itens[i].preco) >= 22 && parseFloat(this.itens[i].preco) <= 30){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 4){
                            if(parseFloat(this.itens[i].preco) > 30){
                                temp.push(this.itens[i]);  
                            }
                        }   
                }
           }
           this.itens = temp; 
        }
        else if(this.selectPedra === '' && this.selectTipo === '' && this.selectMaterial !== '' && this.selectPreco === ''){ 
           for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].material === this.selectMaterial){
                    temp.push(this.itens[i]);
                }
           }
           this.itens = temp; 
        }else if(this.selectPedra === '' && this.selectTipo === '' && this.selectMaterial !== '' && this.selectPreco !== ''){ 
           for(let i = 0; i < this.itens.length; i++){
                if(this.itens[i].material === this.selectMaterial){
                        if(this.valores.indexOf(this.selectPreco) === 0){
                            if(parseFloat(this.itens[i].preco) < 10){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 1){
                            if(parseFloat(this.itens[i].preco) >= 10 && parseFloat(this.itens[i].preco) <= 15){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 2){
                            if(parseFloat(this.itens[i].preco) >= 16 && parseFloat(this.itens[i].preco) <= 21){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 3){
                            if(parseFloat(this.itens[i].preco) >= 22 && parseFloat(this.itens[i].preco) <= 30){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 4){
                            if(parseFloat(this.itens[i].preco) > 30){
                                temp.push(this.itens[i]);  
                            }
                        }   
                }
           }
           this.itens = temp; 
        }else if(this.selectPedra === '' && this.selectTipo === '' && this.selectMaterial === '' && this.selectPreco !== ''){
           for(let i = 0; i < this.itens.length; i++){
                        if(this.valores.indexOf(this.selectPreco) === 0){
                            if(parseFloat(this.itens[i].preco) < 10){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 1){
                            if(parseFloat(this.itens[i].preco) >= 10 && parseFloat(this.itens[i].preco) <= 15){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 2){
                            if(parseFloat(this.itens[i].preco) >= 16 && parseFloat(this.itens[i].preco) <= 21){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 3){
                            if(parseFloat(this.itens[i].preco) >= 22 && parseFloat(this.itens[i].preco) <= 30){
                                temp.push(this.itens[i]);  
                            }
                        }else if(this.valores.indexOf(this.selectPreco) === 4){
                            if(parseFloat(this.itens[i].preco) > 30){
                                temp.push(this.itens[i]);  
                            }
                        }   
           }
           this.itens = temp; 
        }    
    },
  }         
}
</script>

<style>

.texts {
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
