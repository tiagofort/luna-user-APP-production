<template>
        <v-container>
                    <v-row>
                            <v-col>
                                    <v-sheet>
                                        <strong><p class="text-center texts mt-4">{{ pedra.pedra }}</p></strong>
                                        <strong><p class="text-center texts">{{ pedra.titulo1 }}</p></strong>
                                        <p class="text-justify texts texts">{{ pedra.sobre }}</p>
                                        <strong><p class="text-center texts">{{ pedra.titulo2 }}</p></strong>
                                        <p class="text-justify texts">{{ pedra.significado }}</p>
                                        <strong><p class="text-center texts">{{ pedra.titulo3 }}</p></strong>
                                        <p class="text-justify texts">{{ pedra.efeitos }}</p>
                                        <strong><p class="text-center texts">{{ pedra.titulo4 }}</p></strong>
                                        <p class="text-justify texts">{{ pedra.limpeza }}</p>
                                    </v-sheet>
                            </v-col>
                    </v-row>
        </v-container>
</template>

<script>
export default {
    data() {
      return {
        pedra: [],
      };
    },

    async mounted(){
       await this.getStone();
    },

    computed:{
        selecionado(){
            return this.pedra;
       } 
    },

    methods:{

        async getStone(){
            let param = this.getId();
            this.$axios
                .get(`/stone/buscar_pedra/${param}`)
                .then((response) => {
                    this.pedra = response.data;
                }).catch((error) => {
                    console.log(error);
                });
        },

       getId() {
            return window.location.pathname.split("/")[2];
       }, 
    }
}    
</script>