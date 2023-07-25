<template>
  <v-footer
    dark
    padless
    color="#fbede4"
    :width="getWidth"
    class="mt-3"
  >
      <v-card
        flat
        tile
        color="#fbede4"
        class="mx-auto text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            class="mx-4"
            icon
            @click="openIntagram(icon.url)"
          >
            <v-icon color="#b86935" size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="texts pt-0">
          <span class="texts">Lunas Crystals and team thank you for your visit. Enjoy and stay connected with us on our social media. Stay tuned for news.</span> 
        </v-card-text>
      
        <v-divider></v-divider>

        <v-card-text class="texts">
          <span class="texts">{{ new Date().getFullYear() }}</span>
        </v-card-text>
      </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons:
      [
        {
            icon: 'mdi-instagram',
            url: 'https://www.instagram.com/lunapedraria.ie/'
        }
      ]  
  }),

  methods:{

    openIntagram(url){
        window.open(url, '_blank');
    }

  },

  computed:{

    getWidth(){
      return this.$vuetify.breakpoint.width;
    },

  }

}
</script>

<style>

.texts {
    color: #b86935;
}

</style>