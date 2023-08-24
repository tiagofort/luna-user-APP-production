<template>
  <v-container fluid class="text-center pa-3 mr-n2 mt-n8 mb-15">
        <v-container :max-width="getMaxWidth" class="text-center fundo">
            <v-row justify="center" class="mb-5">
                <v-col>
                    <Acessorie />
                </v-col>
            </v-row>
        </v-container>
  </v-container>    
</template>

<script>
import Acessorie from '~/components/Acessorie.vue';
export default {
    data () {
     return{
     
    }
  },
  components:{ Acessorie },
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