<template>
    <v-container class="mt-5" fluid>
      <v-row>
        <v-col cols="12" class="pa-0">
            <v-img
              :src="bannerImage"
              alt="Banner Image"
              class="pr-0" 
            ></v-img>
        </v-col>
      </v-row>
  </v-container>
</template>
  
<script>
import banner from '@/static/banner/banner_final.jpeg';

export default {
    data() {
      return {
        aspectRatio: 2 / 1,
        bannerImage: banner
      };
    },

    computed:{

      getMaxWidth() {
        return this.$vuetify.breakpoint.width; 
      },
      
      getConfig() {
        return  this.$vuetify.breakpoint.sm.down ? "ml-n15" : "";
      },

      getAspectRatio() {
          if (this.$vuetify.breakpoint.width < 600) {
              return 2 / 1;
          } else {
              return 3 / 1;
          }
      }
    }
};
</script>

  
  
  
  
  
  
  