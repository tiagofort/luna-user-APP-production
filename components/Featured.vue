<template>
  <v-container>
    <v-row v-if="slides.length > 0">
          <v-col class="ml-2">
              <v-lazy
                v-model="isActive"
                :options="{ threshold: 1 }"
                min-height="200"
                transition="fade-transition"
              >
                  <v-card
                      elevation="24"
                      max-width="450"
                  >
                      <v-carousel
                          :continuous="true"
                          :cycle="cycle"
                          :show-arrows="true"
                          hide-delimiter-background
                          delimiter-icon="mdi-minus"
                          virtual-mode
                      >
                              <a>
                                <v-carousel-item
                                    v-for="(slide, i) in slides"
                                    :key="i"
                                    :src="slide.url"
                                    class="transparent"
                                    virtual-mode
                                    @click="openFeatured(slide.id_produto)"
                                ></v-carousel-item>
                              </a>
                      </v-carousel>
                  </v-card>
              </v-lazy>     
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
      this.$axios
        .get("/slide/buscarSlides")
        .then((response) => (this.slides = response.data));
    },
    
    openFeatured(id){
      this.$router.push({
          name: "accessories-acessories",
          params: { acessories: id },
      });
    }

  },

  async mounted() {
    await this.initializeSlides();
  }

}
</script>