<template>
  <v-container class="mt-5 text-center">
            <AboutUs />    
  </v-container>  
</template>

<script>
import AboutUs from '@/components/AboutUs.vue';

export default {
  data() {
    return {
    };
  },
  components: { AboutUs }
};
</script>

<style>
.texts {
  color: #b86935;
}

</style>