<template>
    <v-container>
        <v-lazy
          v-model="isActive"
          :options="{ threshold: 1.0 }"
          min-height="200"
          transition="fade-transition"
        >
            <v-row class="ml-2 mt-1">
                <v-row>
                  <v-col v-for="(item,i) in stones" :key="i" sm="4" md="4" lg="3" class="pa-2 d-flex align-center justify-center">
                        <v-sheet width="80" class="texts">
                            <a><v-img @click="openStoneDetail(item.name)" width="80" :src="item.stone"></v-img></a><span class="texts">{{ item.name }}</span>
                        </v-sheet>  
                  </v-col>
                </v-row>
            </v-row>
        </v-lazy>     
    </v-container>
</template>

<script>
import pyrite from '../static/stones/pyrite.png';
import amethyst from '../static/stones/amethyst.png';
import black from '../static/stones/black.png';
import rose from '../static/stones/rose.png';
import crystalquartz from '../static/stones/crystalquartz.png';
import whitequartz from '../static/stones/whitequartz.png';
import onyx from '../static/stones/onyx.png';
import agate from '../static/stones/agate.png';
import selenite from '../static/stones/selenite.png';
import apatite from '../static/stones/apatite.png';
import aquamarine from '../static/stones/aquamarine.png';
import sodalite from '../static/stones/sodalite.png';
import amazonite from '../static/stones/amazonite.png';

export default {
    data() {
        return{
           isActive: false,
           stones: 
           [
              {
                stone: agate,
                name: 'Agate'
              },
              {
                stone: amazonite,
                name: 'Amazonite'
              },
              {
                stone: amethyst,
                name: 'Amethyst'
              },
              {
                stone: apatite,
                name: 'Apatite'
              },
              {
                stone: aquamarine,
                name: 'Aquamarine'
              },
              {
                stone: black,
                name: 'Black Tourmaline'
              },
              {
                stone: crystalquartz,
                name: 'Crytal Quartz'
              },
              {
                stone: onyx,
                name: 'Onyx'
              },
              {
                stone: pyrite,
                name: 'Pyrite'
              },
              {
                stone: rose,
                name: 'Rose Quartz'
              },
              {
                stone: selenite,
                name: 'Selenite'
              },
              {
                stone: sodalite,
                name: 'Sodalite' 
              },
              {
                stone: whitequartz,
                name: 'White Quartz'
              }
           ],
        }
    },

    methods:{

      openStoneDetail(param){
        this.$router.push({
            name: "stone-stone",
            params: { stone: param },
        });
      }

    }
}
</script>
