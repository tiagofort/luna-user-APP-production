<template>
     <v-container fluid class="text-center pa-3 mr-n2 mt-n8 mb-15">
        <v-container :max-width="getMaxWidth" class="text-center fundo">
                  <v-row justify="center" class="mb-5">
                      <v-col>
                          <StoneDetail />
                      </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-sheet width="800">
                      <v-col>
                          <ItemsStone />
                      </v-col>
                    </v-sheet>  
                  </v-row>
        </v-container>
  </v-container>    
</template>

<script>
import StoneDetail from '@/components/StoneDetail.vue';
import ItemsStone from '@/components/ItemsStone.vue';
export default {
    data () {
     return{
     
    }
  },
  components:{ StoneDetail, ItemsStone },
  async mounted() {},
  methods:{},
  computed: {
    getMaxWidth (){
        return this.$vuetify.breakpoint.width - (this.$vuetify.breakpoint.width * 0.2);
    }
  }    
}       
</script>

<style>
</style>