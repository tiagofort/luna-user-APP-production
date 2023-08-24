<template>
  <v-container>
    <v-row v-if="slides.length > 0">
          <v-col class="ml-2">
                  <v-card
                      elevation="24"
                      max-width="450"
                  >
                      <v-carousel
                          :continuous="true"
                          :cycle="cycle"
                          :show-arrows="true"
                          hide-delimiter-background
                          hide-delimiters
                          virtual-mode
                      >
                              <a>
                                <v-carousel-item
                                    v-for="(slide, i) in slides"
                                    :key="i"
                                    :src="slide.url"
                                    class="transparent"
                                    virtual-mode
                                    reverse-transition="fade-transition"
                                    transition="fade-transition"
                                    @click="openFeatured(slide.id_produto)"
                                ></v-carousel-item>
                              </a>
                      </v-carousel>
                  </v-card>
          </v-col>   
    </v-row>     
  </v-container>  
</template>

<script>
export default {
  data() {
    return {
        cycle: true,
        slides: [],
        isActive: false
    }
  },

  methods:{

    async initializeSlides() {
      await this.$axios
        .get("/slide/buscarSlides")
        .then((response) => (this.slides = response.data));
    },
    
    openFeatured(id){
      this.$router.push({
          name: "accessories-acessories",
          params: { acessories: id },
      });
    },

    preloadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    },

  },

  async beforeMount() {
    try {
      const response =  await this.$axios.get("/slide/buscarSlides");                                  
      this.slides = response.data; 
      const imgs = this.slides;
      await Promise.all(imgs.map(item => this.preloadImage(item.url)));
      console.log('All images preloaded');
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }

}
</script>