<template>
    <v-container>
                <v-sheet class="text-center">
                    <div class="text-h4 mt-5 texts line-title">About us</div>
                        <v-row align="center" justify="center">
                            <v-col xs="8" sm="10" md="12" lg="6" xl="6" class="pa-5 pb-1 mt-3 text-center">
                                <div max-width="300" class="texts text-justify text-h6 mt-3 pa-3">{{ about_resume }}</div><br>
                            </v-col>
                        </v-row>
                </v-sheet>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      about_resume: "If you believe in the energy of natural stones and crystals, you are in the right place! Luna Crystals" +
                    " aims to be able to tune your vibrations with those of the chosen stones, improving and enhancing your energies"+
                    " in everyday life, supporting various aspects of well-being through unique and elegant accessories that will make"+
                    " you even more beautiful. Our jewellery are a great way to innovate and show your identity with style. Here you will"+
                    " find the greatest variety and quality of accessories with natural stones and crystals to give a special touch to your"+
                    " look. Being with us is an invitation to relax, intuit, transform, love yourself, find yourself and rediscover the most"+
                    " beautiful thing that lives in us. We want to share with the world the beauty and grandeur of these special elements that are crystals."+
                    " Check out everything we offer and start your experience in this crystalline universe!"
    };
  },
};
</script>

<style>

.texts {
  color: #b86935;
}

.line-title {
  background-image: linear-gradient(
    to right,
      #b86935,
      white 35%,
      white 65%,
      #b86935
  );
  background-repeat: no-repeat;
  background-size: 100% 2px;
  background-position: 0 center;
}

</style>