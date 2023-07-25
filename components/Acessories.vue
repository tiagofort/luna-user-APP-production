<template>
  <v-sheet height="auto">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="400"
        >
            <v-card>
                <v-card-title class="text-h5">
                    {{dialog_titulo}}
                </v-card-title>
                    <v-card-subtitle class="mt-3">
                        <v-textarea :rules="[required()]" v-if="deletar==false" v-model="comentario_cliente" solo label="Write your comment here"></v-textarea>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red darken-1"
                            text
                            @click="dialog = false"
                        >
                            cancel
                        </v-btn>
                        <v-btn
                            color="#b86935"
                            text
                            @click="botaoConfirmar()"
                        >
                            {{botao_confirmar}}
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>
        <Request ref="Request" :submeterPedido="enviarPedido" :closeRequest="fecharRequest" :dialogRequest="dialogRequest"/>
        <div class="hidden-xs-only mt-5">
          <v-row class="d-flex justify-center">
                  <v-col sm="6" md="6" lg="6" xl="6">
                      <v-carousel class="white" max-width="500" height="600" :show-arrows="false" virtual-mode>
                          <v-carousel-item
                              v-for="(n,i) in imgs"
                              :key="i"
                              :src="n"
                              contain
                              virtual-mode
                              :cycle="true"
                          ></v-carousel-item>
                      </v-carousel>
                  </v-col>
                  <v-col class="mt-5" sm="6" md="6" lg="6" xl="6">
                      <v-sheet class="" color="white" height="auto">
                          <v-card-title class="texts mb-n3">
                            {{ items.titulo }}
                          </v-card-title>
                              <div class="text-left texts ml-4 mb-2">
                                {{ items.subtitulo }}
                              </div>
                          <v-row class="ml-1 mt-n1 mb-1">
                              <v-rating class="ml-1 mb-2 texts text-left" length="5" v-model="rating" color="warning" readonly small half-increments></v-rating>
                              <span class="mt-2 ml-3 text-caption texts text-left">
                                {{ rating }} stars - ({{ reviews }} reviews)
                              </span>
                          </v-row>
                          <v-divider width="60%" class="texts mb-2"></v-divider>
                          <div class="ml-3 text-left texts">
                            <strong class="mr-2 smaller-text">- Product code:</strong>
                            <span class="smaller-text">
                              {{ items.cod_prod }}
                            </span>
                          </div> <br>
                          <div class="ml-3 text-left texts">
                            <strong class="mr-2">- Type: </strong>
                            <span>
                              {{ items.tipo }}
                            </span>
                          </div> <br>
                          <div class="ml-3 text-left texts">
                            <strong class="mr-2">- Material: </strong>
                            <span>
                              {{ items.material }}
                            </span>
                          </div> <br>
                          <div class="ml-3 text-left texts">
                            <strong class="mr-2">- Stone: </strong>
                            <span>
                              {{ items.pedra }}
                            </span>
                          </div> <br>
                          <div class="ml-3 text-left texts">
                            <strong class="mr-2">- Weight: </strong>
                            <span>
                              {{ items.peso }} grams
                            </span>
                          </div> <br>
                          <div class="ml-3 text-left texts">
                            <strong class="mr-2">- About: </strong>
                          </div> <br>
                          <div class="ml-5 mt-n5 mb-3 text-left texts">
                            <span>
                              {{ items.comentario }}
                            </span>
                          </div>
                          <div v-if="items.desconto == 0" class="ml-3 text-left texts">
                            <strong class="mr-2 text-h4">- Price: </strong>
                            <span class="text-h4">
                              €{{ items.preco }}
                            </span>
                          </div> <br>
                          <div v-if="items.desconto !== 0" class="ml-3 text-left texts">
                            <strong class="mr-2 text-h4 line-through">- Price: </strong>
                            <span class="text-h4 line-through">
                              €{{ items.preco }}
                            </span>
                          </div> <br>
                          <div v-if="items.desconto !== 0" class="ml-3 text-left texts">
                            <strong class="mr-2 text-h4">- Sale Price: </strong>
                            <span class="text-h4">
                              €{{ getDesconto(items.preco) }}
                            </span>
                          </div> <br>
                          <div class="ml-3 mt-n5 text-left texts">
                            <strong class="mr-2 text-body-1">- Inventory: </strong>
                            <span class="text-body-1">
                              {{ estoque_atual.estoque_atual }}
                            </span> 
                            <span v-if="estoque_atual.estoque_atual == 0">(Out of stock)</span>
                          </div> <br>
                          <div class="text-left">
                            <v-btn v-if="$auth.loggedIn" color="#b86935" class="white--text mb-3" @click="requisicao()">Make a request</v-btn>
                            <p v-if="$auth.loggedIn"> Or send us message: +353 089 941 4489</p>
                          </div>
                          <div class="text-left">
                            <span  v-if="!$auth.loggedIn" class="red--text">You must be logged in to request this product</span>
                          </div>
                      </v-sheet>
                  </v-col>      
          </v-row>
        </div>
        <div class="hidden-sm-and-up">
            <v-row>
                    <v-col cols="12">
                        <v-carousel class="white" max-width="500" height="600" :show-arrows="false" virtual-mode>
                            <v-carousel-item
                                v-for="(n,i) in imgs"
                                :key="i"
                                :src="n"
                                contain
                                virtual-mode
                                :cycle="true"
                            ></v-carousel-item>
                        </v-carousel>
                    </v-col>
            </v-row>
            <v-row>     
                    <v-col class="mt-5" cols="12">
                        <v-sheet class="" color="white" height="auto">
                            <v-card-title class="texts mb-n3">
                              {{ items.titulo }}
                            </v-card-title>
                                <div class="text-left texts ml-4 mb-2">
                                  {{ items.subtitulo }}
                                </div>
                            <v-row class="ml-1 mt-n1 mb-1">
                                <v-rating class="ml-1 mb-2 texts text-left" length="5" v-model="rating" color="warning" readonly small half-increments></v-rating>
                                <span class="mt-2 ml-3 text-caption texts text-left">
                                  {{ rating }} stars - ({{ reviews }} reviews)
                                </span>
                            </v-row>
                            <v-divider width="60%" class="texts mb-2"></v-divider>
                            <div class="ml-3 text-left texts">
                              <strong class="mr-2 smaller-text">- Product code:</strong>
                              <span class="smaller-text">
                                {{ items.cod_prod }}
                              </span>
                            </div> <br>
                            <div class="ml-3 text-left texts">
                              <strong class="mr-2">- Type: </strong>
                              <span>
                                {{ items.tipo }}
                              </span>
                            </div> <br>
                            <div class="ml-3 text-left texts">
                              <strong class="mr-2">- Material: </strong>
                              <span>
                                {{ items.material }}
                              </span>
                            </div> <br>
                            <div class="ml-3 text-left texts">
                              <strong class="mr-2">- Stone: </strong>
                              <span>
                                {{ items.pedra }}
                              </span>
                            </div> <br>
                            <div class="ml-3 text-left texts">
                              <strong class="mr-2">- Weight: </strong>
                              <span>
                                {{ items.peso }} grams
                              </span>
                            </div> <br>
                            <div class="ml-3 text-left texts">
                              <strong class="mr-2">- About: </strong>
                            </div> <br>
                            <div class="ml-5 mt-n5 mb-3 text-left texts">
                              <span>
                                {{ items.comentario }}
                              </span>
                            </div>
                            <div v-if="items.desconto == 0" class="ml-3 text-left texts">
                              <strong class="mr-2 text-h4">- Price: </strong>
                              <span class="text-h4">
                                €{{ items.preco }}
                              </span>
                            </div> <br>
                            <div v-if="items.desconto !== 0" class="ml-3 text-left texts">
                              <strong class="mr-2 text-h4 line-through">- Price: </strong>
                              <span class="text-h4 line-through">
                                €{{ items.preco }}
                              </span>
                            </div> <br>
                            <div v-if="items.desconto !== 0" class="ml-3 text-left texts">
                              <strong class="mr-2 text-h4">- Sale Price: </strong>
                              <span class="text-h4">
                                €{{ getDesconto(items.preco) }}
                              </span>
                            </div> <br>
                            <div class="ml-3 mt-n5 text-left texts">
                              <strong class="mr-2 text-body-1">- Inventory: </strong>
                              <span class="text-body-1">
                                {{ estoque_atual.estoque_atual }}
                              </span> 
                              <span v-if="estoque_atual.estoque_atual == 0">(Out of stock)</span>
                            </div> <br>
                            <div class="text-left">
                              <v-btn v-if="$auth.loggedIn" color="#b86935" class="white--text mb-3" @click="requisicao()">Make a request</v-btn>
                              <p v-if="$auth.loggedIn"> Or send us message: +353 089 941 4489</p>
                            </div>
                            <div class="text-left">
                              <span  v-if="!$auth.loggedIn" class="red--text">You must be logged in to request this product</span>
                            </div>
                        </v-sheet>
                    </v-col>
            </v-row>      
        </div>
        <v-row>
            <v-col v-if="$auth.loggedIn" align-self="center" xs="12">
                <v-expansion-panels>
                    <v-expansion-panel id="review" @click="scrollToSection('#review')">
                        <v-expansion-panel-header class="texts">
                            Review
                        </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-sheet
                                    class="mx-auto mt-2"
                                    color="White"
                                    max-width="100%" 
                                    height="250"
                                >
                                        <v-sheet color="white" class="ma-auto text-center">
                                            <v-card-title class="texts justify-center">
                                                Your Review 
                                            </v-card-title>
                                                <v-card-subtitle class="justify-center">
                                                    <v-row>
                                                        <v-col>
                                                            <v-rating
                                                                color="warning"
                                                                class="mx-auto my-auto"
                                                                v-model="usuario_rating"
                                                                background-color="grey"
                                                                :size="getSize"
                                                                hover
                                                                half-increments
                                                                @input="updateReview()"
                                                            ></v-rating>
                                                        </v-col>
                                                    </v-row> 
                                                </v-card-subtitle>
                                                <v-card-subtitle v-if="seScored==false" class="red--text justify-center">
                                                  (You did not score this product)
                                                </v-card-subtitle>
                                                <v-card-actions class="red--text justify-center">
                                                    <v-btn v-if="seComentario == true" color="yellow accent-4" @click="inserirComentario()">
                                                      Insert a Comment
                                                    </v-btn>
                                                </v-card-actions>
                                        </v-sheet>
                                </v-sheet>
                            </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels> 
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-expansion-panels>
                    <v-expansion-panel id="comments" @click="scrollToSection('#comments')">
                        <v-expansion-panel-header class="texts">
                            Comments
                        </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                    <v-sheet
                                        class="mx-auto mt-2 pa-0 overflow-y-auto"
                                        color="white"
                                        max-width="100%" 
                                        height="250"
                                    >
                                        <v-card-text color="white" class="ma-auto text-center" v-if="comentarios.length == 0" max-width="700">
                                            <v-card-subtitle class="texts">No comments until now</v-card-subtitle>
                                        </v-card-text>
                                        <v-sheet color="white" class="pa-0 text-center" max-width="auto" height="400">
                                            <v-list v-if="getComentarios.length > 0" color="white" three-line>
                                                    <v-list-item v-for="(item, index) in getComentarios" :key="index" class="pl-0">
                                                        <v-list-item-avatar>
                                                            <v-img :src="item.avatar"></v-img>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                                <v-list-item-title class="text-left texts" v-html="item.cliente"></v-list-item-title>
                                                                    <div v-if="$auth.loggedIn" class="mb-3">
                                                                        <v-btn 
                                                                            v-if="$auth.user._id == item.id_cliente"
                                                                            icon 
                                                                            small 
                                                                            absolute 
                                                                            top 
                                                                            right 
                                                                            class=""
                                                                            @click="deletarComentario(item._id)">
                                                                            <v-icon color="#b86935">mdi-delete-circle</v-icon>
                                                                        </v-btn>
                                                                    </div>
                                                                <div class="text-left" v-html="item.comentario"></div>
                                                                <v-divider></v-divider>    
                                                        </v-list-item-content>
                                                    </v-list-item>
                                            </v-list>
                                        </v-sheet>
                                        <v-row justify="center" align="center" class="mt-3 mr-2 ml-2">
                                            <v-pagination
                                                color="#b86935"
                                                v-model="currentPage"
                                                :length="totalPages"
                                                @input="updatePage"
                                                v-if="comentarios.length != 0"
                                            ></v-pagination>
                                        </v-row>
                                    </v-sheet>
                            </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>         
            </v-col>
        </v-row>
        <v-card class="pa-3 mt-2">
          <div v-if="sliceItens.length > 0" class="mt-5 mb-5 text-body-1 texts text-left">
            <strong>What people usually buy together</strong>
          </div>
          <v-row>
              <v-col
                  v-for="(item,i) in sliceItens"
                  :key="i"
                  :id="item._id"
                  class="d-flex justify-start child-flex"
                  :cols="getCols"
              >
                      <v-sheet max-width="250">
                          <v-hover>
                              <template v-slot:default="{ hover }">  
                                  <a>
                                      <v-img
                                        :src="hover? item.midia.url2 : item.midia.url1"
                                        aspect-ratio="1"
                                        max-width="250"
                                        max-height="350"
                                        class="grey lighten-2"
                                        @click="openItem(item._id)"
                                      ></v-img>
                                  </a>  
                              </template>
                          </v-hover>
                          <a @click="openItem(item._id)">
                            <p class="texts text-left mt-2">
                              {{ item.titulo + ' - ' + item.pedra }}
                            </p>
                          </a>
                          <p class="text-left mt-n2">
                            {{ item.preco+'€' }}
                          </p>
                      </v-sheet>
              </v-col>
          </v-row>
      </v-card>
  </v-sheet>    
</template>

<script>
import comingSoon from '@/static/general/comingSoon.png';
import noimg from '@/static/general/noimg.png';
import validacao from '~/utils/validacao';
import Request from '~/components/Request.vue';

export default {

  data () {
     return{
        dialog: false,
        dialogRequest: false,
        data: {
            qtd: '',
            obs: ''
        },
        dialog_titulo: '',
        botao_confirmar: '',
        deletar: false,
        rating: 0,
        usuario_rating: 0, 
        reviews: 0,
        render: 0,   
        items: [],
        sugestoes: [],
        imgs: [],
        imgPrincipal: '',
        novidades: [],
        estoque_atual: [],
        ratings: [],
        rating_cliente: [],
        comentarios: [],
        seScored: false,
        seComentario: false,
        comentario_cliente: '',
        id_delete: "",
        currentPage: 1,
        itemsPerPage: 4,
        ...validacao
    }
},

components: { Request },

async mounted() {  

    await this.inicializar();

    await this.getRating();

    await this.getRating_cliente();

    await this.getSugestoes();

    this.getSaldoEstoque();

    this.getNovidades();

    this.renderPage();  

},

methods:{

  renderPage(){
    this.render += 1;
  }, 

  scrollToSection(section){
      this.$vuetify.goTo(section, { duration: 1000, offset: 0 });
      this.drawer = false;
  },

  getNovidades(){
    this.$axios
        .get("/item/buscarNovidades")
        .then((response) => (this.novidades = response.data));
  },

  getSaldoEstoque(){
    let id = this.getId();
    this.$axios
        .get(`/estoque/estoque_id/${id}`)
        .then((response) => (this.estoque_atual = response.data));
  },

  updatePage(page) {
    this.currentPage = page;
  },

  async getRating(){
    let id = this.getId();
    this.$axios
        .get(`/rating/buscarRating/${id}`)
        .then((response) => {
            this.ratings = response.data;
            this.rating = this.getMedia();
            this.reviews = this.getReviews();
        }).catch((error) => {
            console.log(error);
        });
  },

  async getRating_cliente(){
    if(this.$auth.loggedIn){
      let id_prod = this.getId();
      let id_cli = this.$auth.user._id;
      this.$axios
          .get(`/rating/buscarRating_cliente/${id_cli}/${id_prod}`)
          .then((response) => {
              this.rating_cliente = response.data;
              this.usuario_rating = this.getRatingUsu();
          }).catch((error) => {
              console.log(error);
          });
    }
  },

  async inicializar(){
      let id = this.getId();
      this.$axios
          .get(`/item/buscarId/${id}`, {})
          .then((response) => {
             this.items = response.data;
             this.imgPrincipal = this.items.midia.url1 ? this.items.midia.url1: "";
             this.imgs.push(this.items.midia.url1 ? this.items.midia.url1: comingSoon);
             this.imgs.push(this.items.midia.url2 ? this.items.midia.url2: comingSoon);
             this.imgs.push(this.items.midia.url3 ? this.items.midia.url3: comingSoon);
             this.imgs.push(this.items.midia.url4 ? this.items.midia.url4: comingSoon);
             this.imgs.push(this.items.midia.url5 ? this.items.midia.url5: comingSoon);
             this.imgs.push(this.items.midia.url6 ? this.items.midia.url6: comingSoon);
             this.imgs.push(this.items.midia.url7 ? this.items.midia.url7: comingSoon);
          }).catch((error) => {
            console.log(error);
          });
  },

  getMedia(){
      return this.ratings[0].media == 0 ? 0 : parseFloat((Math.round(this.ratings[0].media * 100) / 100).toFixed(2)); 
  },

  getReviews(){
      return this.ratings[0].avaliacoes == 0? 0 : this.ratings[0].avaliacoes;
  },
      
  getRatingUsu(){
    if(this.rating_cliente.length > 0){
        this.seScored = true;
        return this.rating_cliente[0].rating == null? 0 : this.rating_cliente[0].rating;
    }
  },

  updateReview(){
    let id_produto = this.getId();
    this.$axios
        .$post(`/rating/addRating`, {
              rating: this.usuario_rating,
              id_produto: id_produto,
              id_cliente: this.$auth.user._id,
              comentario: ""
        })
        .then((response) => {
              console.log("Success");
              this.getRating();
              this.seScored = true;
              this.renderPage();
              this.$notifier.showMessage({ 
                content: 'Review saved! Thank you!', 
                color: 'green', 
                time: 2000 
              });
        });
  },

  requisicao(){
      this.dialogRequest = this.dialogRequest == true? false: true;
  },

  enviarPedido(data_request){
      let id = this.getId();
      this.data.qtd = data_request.qtd;
      this.data.obs = data_request.obs;
      this.$axios
          .$post(`/pedido/addPedido`, {
                titulo: 'Request',
                id_produto: id,
                cod_produto: '',
                qtd: parseInt(this.data.qtd),
                id_remetente: this.$auth.user._id,
                nome_remetente: '',
                id_destinatario: '',
                mensagem: this.data.obs,
                status: 0,
                lido: 0,
                tipo: 0,
                id_mensagem_origem: ''
          })
          .then((response) => {
                console.log("Success");
                this.dialogRequest = false;
                this.$refs.Request.clear();
                this.$notifier.showMessage({ 
                  content: 'Request sent! We will contact you as soon as possible! Thank you!',
                  color: 'green', 
                  time: 2000 
                });
          });
  },

  fecharRequest(param){
    this.dialogRequest = param;
    this.$refs.Request.clear();
  },

  carregarProduto(id){
    this.$router.push({
      name: "accessories-acessories",
      params: { acessories: id },
    });
  },

  inserirComentario(){
    this.dialog = true;
    this.deletar = false;
    this.dialog_titulo = "Inserting a comment";
    this.botao_confirmar = "save";
  },
  
  async deletarComentario(id){
    this.dialog = true;
    this.deletar = true;
    this.dialog_titulo = "Deleting your comment";
    this.botao_confirmar = "yes";
    this.id_delete = id;
  },

  async botaoConfirmar(id){
    if(this.deletar == false){
        let id_produto = this.getId();
        await this.$axios
                  .$post(`/rating/add_comentario`, {
                        id_produto: id_produto,
                        id_cliente: this.$auth.user._id,
                        comentario: this.comentario_cliente
                  })
                  .then((response) => {
                        console.log("Success");
                        this.comentario_cliente = '';
                        this.dialog = false;
                        this.seComentario = false;
                        this.getRating();
                        this.renderPage();
                        this.$notifier.showMessage({ 
                          content: 'Comment saved! Thank you!', 
                          color: 'green', 
                          time: 2000 
                        });
                  })
    }else {
        await this.$axios
                  .put(`/rating/deleteComentario/${this.id_delete}`)
                  .then((response) => {
                        console.log("Success");
                        this.dialog = false;
                        this.seComentario = true;
                        this.deletar = false;
                        this.getRating();
                        this.renderPage();
                        this.$notifier.showMessage({ 
                          content: 'Comment deleted!', 
                          color: 'green', 
                          time: 2000 
                        });
                  })
    }
  },

  getId() {
    return window.location.pathname.split("/")[2];
  },

  mudarImagem(url){
    this.imgPrincipal = url;
  },

  getDesconto(price){
    return parseFloat(price) - (parseFloat(price) * (this.items.desconto / 100));
  },

  async getSugestoes(){
    let id = this.getId()
    this.$axios
        .get(`/item/buscar_sugestoes/${id}`)
        .then((response) => (this.sugestoes = response.data));
  },

  openItem(id){
    this.$router.push({
        name: "accessories-acessories",
        params: { acessories: id },
    });
  }
},

computed: {

  getSize() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 15
      case 'sm': return 30
      case 'md': return 35
      case 'lg': return 45
      case 'xl': return 50
    }
  },

  totalPages() {
      return Math.ceil(this.comentarios.length / this.itemsPerPage);
  },

  getComentarios(){
    let data;
    this.comentarios = [];
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
      Object.keys(this.ratings).forEach((i) => {
        if(this.ratings[i].id_produto == this.getId() && this.ratings[i].comentario != ""){
           data = new Object();
           data._id = this.ratings[i]._id;
           data.id_cliente = this.ratings[i].id_cliente;
           data.cliente = this.ratings[i].cliente;
           data.avatar = this.ratings[i].avatar == ""? noimg : this.ratings[i].avatar;
           data.comentario = this.ratings[i].comentario;
           this.comentarios.push(data);
        }
        if(this.$auth.loggedIn){
            if(this.ratings[i].id_cliente == this.$auth.user._id && this.ratings[i].comentario == ""){
              this.seComentario = true;
            } 
        }     
      })
      return this.comentarios.slice(startIndex, endIndex);
  },

  sliceItens(){
      return this.sugestoes.slice(0,4);
  },
    
  getCols(){
      return this.$vuetify.breakpoint.mdAndUp ? 3 : 6;
  },

}    

}
</script>

<style>

.texts {
    color: #b86935;
}

.line-through{
  text-decoration: line-through;
}

</style>