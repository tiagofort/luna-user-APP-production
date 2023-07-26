<template>
    <v-container class="white">
        <ChangePassword />
    </v-container>
</template>

<script>
import ChangePassword from '@/components/ChangePassword.vue';
export default {
  components: { ChangePassword },
  data() {
    return{
    }
  },

  methods: {
  }
}  
</script>

<style scoped>
#login-page {
    margin-top: 10px;
}

#logo-image {
    margin-left: auto;
    margin-right: auto;
}

#login-page{
    width: 100%;
}
  
</style>