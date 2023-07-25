<template>
    <div>  
        <v-app-bar
            app
            color="#FFFFFF"
        >
            <v-app-bar-nav-icon color="#b86935" class="hidden-sm-and-up" @click="drawer = true"></v-app-bar-nav-icon>
            <v-tabs
                centered
                class="hidden-xs-only ml-5"
                color="#b86935"
            >
                <v-tab
                  v-for="link in links"
                  :key="link.title"
                  @click="openPage(link.id)"
                  router
                  exact
                >
                  <v-icon color="#b86935" class="mr-2 font-weight-bold">{{ link.icon }}</v-icon>
                  <span class="texts text--lighten-2">{{ link.title }}</span>
                </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <div v-if="!$auth.loggedIn" class="mr-2">
              <v-btn icon color="white" to="/login" class="mr-5 hidden-xs-only">
                  <v-icon color="#b86935" class="mr-1">mdi-login</v-icon>
                  <span class="mr-6 hidden-xs-only texts">Login</span>
              </v-btn>
            </div>
            <div v-if="$auth.loggedIn" class="mr-2 hidden-xs-only">
              <v-btn icon color="white" @click="$auth.logout()">
                  <v-icon color="#b86935" class="mr-1">mdi-logout</v-icon>
                  <span class="mr-6 texts">Logout</span>
              </v-btn>
            </div>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            :absolute="getAbsolute"
            :app="getApp"
            :height="getHeight"
        >
            <v-sheet class="pa-2" height="60" color="#b86935">
                  <v-btn
                    color="#BDBDBD"
                    small
                    fab
                    right
                    absolute
                    outlined
                    @click="drawer = !drawer"
                  >
                      <v-icon color="white">mdi-close</v-icon>
                  </v-btn>
            </v-sheet>
            <v-divider></v-divider>
            <v-list
                nav
                dense
            >
                <v-list-item-group
                    v-model="group"
                    active-class="white--text text--accent-4"
                    class="mt-5"
                >
                  <v-list-item v-for="(menu,i) in links" :key="i" @click="openPage(menu.id)" link>
                      <v-list-item-icon>
                          <v-icon color="#b86935">
                            {{ menu.icon }}
                          </v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="texts text-subtitle-1">
                          {{ menu.title }}
                      </v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-spacer></v-spacer>
                    <template v-slot:append>
                        <div v-if="!$auth.loggedIn" class="pa-2 mb-10">
                          <v-btn block icon color="white" to="/login" class="mr-5">
                              <v-icon color="#b86935" class="mr-1">mdi-login</v-icon>
                              <span class="texts">Login</span>
                          </v-btn>
                        </div>
                        <div v-if="$auth.loggedIn" class="pa-2 mb-10">
                          <v-btn block icon @click="$auth.logout()">
                              <v-icon color="#b86935" class="mr-1">mdi-logout</v-icon>
                              <span class="texts">Logout</span>
                          </v-btn>
                        </div>
                    </template> 
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {

    data: () => ({
      drawer: false,
      group: false,  
      links: 
      [        
        {
          icon: 'mdi-home-heart',
          id: 0,
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-necklace',
          id: 1,
          title: 'Accessories',
          to: '/accessories/'
        },
        {
          icon: 'mdi-information-variant',
          id: 2,
          title: 'About Us',
          to: '/about_us'
        }
      ],
    }),

    methods: {

      openPage(id){
        if(id == 0){
          this.$router.push({
            name: "index",
          });
        }else if(id == 1){
          this.$router.push({
            name: "view_all-all",
            params: { all: 'all' },
          });
        }else{
          this.$router.push({
            name: "about_us",
          });
        }
      }

    },

    computed:{

      getHeight(){
        return this.$vuetify.breakpoint.height; 
      },

      getWidth(){
        return this.$vuetify.breakpoint.width - (this.$vuetify.breakpoint.width * 0.01);
      },

      getApp(){
        return this.$vuetify.breakpoint.xs ? true : false;
      },

      getAbsolute(){
        return this.$vuetify.breakpoint.xs? false : true;
      }

    }
}
</script>

<style>

.span:hover {
  font-weight: 900;
}

.texts {
  color: #b86935;
}

.bottom-button {
  position: absolute;
  bottom: 0;
}

</style>