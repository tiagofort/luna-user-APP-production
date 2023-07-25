<template>
      <v-app id="inspire">
          <MenuBar />
            <v-main class="fundo" fluid>
                <v-row>
                    <v-col 
                      cols="12"
                      class="pa-0"
                    >

                        <nuxt />

                    </v-col>
                </v-row>
            </v-main>
          <SnackBar />
          <Footer />
      </v-app>
</template>

<script>
import MenuBarVue from '~/components/MenuBar.vue';
import SnackBar from '~/components/SnackBar.vue';
import Footer from '~/components/Footer.vue';

export default {
  data: () => ({
      links:
      [
        {
          icon: 'mdi-home-heart',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-necklace',
          title: 'Accessories',
          to: '/accessories/all'
        },
        {
          icon: 'mdi-information-variant',
          title: 'About Us',
          to: '/about_us'
        }
      ],
  }),
    components:{ MenuBarVue, SnackBar, Footer }
}
</script>

<style>

html {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}

.fundo{
  background-color: #ffffff;
}

</style>