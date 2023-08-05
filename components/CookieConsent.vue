<template>
    <div class="text-center">
      <v-bottom-sheet
        v-model="showCookieConsent"
        inset
        persistent
      >
        <v-sheet
          class="text-center pa-5"
          height="200px"
        >
          <div class="mt-3 text-button">
            This website uses cookies to ensure you get the best experience.
          </div>
          <v-btn
            class="mt-6"
            text
            color="success"
            @click="acceptCookies()"
          >
            Accept All
          </v-btn>
          <v-btn
            class="mt-6"
            text
            color="error"
            @click="showCookieConsent = !showCookieConsent"
          >
            No, Thanks!
          </v-btn>
        </v-sheet>
      </v-bottom-sheet>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {

    data: () => ({
      showCookieConsent: false,
    }),

    methods: {
        
        acceptCookies() {

            this.showCookieConsent = false;
            Cookies.set('cookieConsent', 'true', { expires: 30 });

        },

        defaultCookies(){

            if(Cookies.get('cookieConsent') == undefined){
                Cookies.set('cookieConsent', 'false', { expires: 30 });
                this.showCookieConsent = true; 
            }else if(Cookies.get('cookieConsent') == 'false'){
                this.showCookieConsent = true;
            }else if(Cookies.get('cookieConsent') == 'true'){
                this.showCookieConsent = false;
            }

        },
        
    },

    mounted(){
        this.defaultCookies();
    }
}
</script>