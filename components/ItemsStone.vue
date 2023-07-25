<template>
        <v-container>
                    <v-row v-if="items.length > 0">
                            <v-col>
                                <strong><p class="texts text-left text-decoration-underline">{{ this.stone }} Featured</p></strong>
                            </v-col>
                    </v-row>
                    <v-row justify="center">
                            <v-col
                                v-for="(item,i) in sliceItens"
                                :key="i"
                                :id="item._id"
                                class="d-flex justify-center child-flex"
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
                                            max-height="300"
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
        </v-container>
</template>

<script>
export default {
    data() {
        return {
           items: [],
           stone: '' 
        }
    },

    async mounted(){
       await this.initializingItens();
    },

    methods:{
        async initializingItens(){
            this.stone = this.getParam().replace(/[^a-zA-Z]/g, " ");
            this.stone = this.stone.replace(/\s+/g, " ");
            this.$axios
                .get(`item/buscarPorParamentro/${this.stone}`)
                .then((response) => (this.items = response.data));
        },

        getParam(){
            return window.location.pathname.split("/")[2];
        },

        openItem(id){
            this.$router.push({
            name: "accessories-acessories",
            params: { acessories: id },
            });
        } 

    },

    computed:{

        getCols(){
           return this.$vuetify.breakpoint.mdAndUp ? 3 : 6;
        },

        sliceItens(){
            return this.items.slice(0,4);
        }
    
    }
}      
</script>