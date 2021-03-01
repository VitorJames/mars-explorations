<template>
  <v-app id="inspire">

    <v-app-bar dark app>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-avatar
      color="deep-orange darken-3"
      class="mr-3"
      size="48"
    >
      <img src="../assets/473346-PGQPSZ-396-ai.png" alt="">
    </v-avatar>
      <v-toolbar-title>MARS <small class="text-uppercase font-weight-thin white--text">EXPLORATIONS</small></v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn depressed color="error" class="mr-3">
        Fotos
      </v-btn>
      <v-btn depressed color="error" class="mr-3">
        Missões
      </v-btn>
      <v-btn depressed color="error">
        Robôs
      </v-btn> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <!--  -->
    </v-navigation-drawer>

    <v-main class="px-0 pt-7">
      
      <v-container>
        <v-row>
            <v-col
              class="mt-0"
              cols="12"
            >
              <v-card height="60" class="grey lighten-3 d-flex align-center">
                  <v-col cols="2">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      offset-y
                      class="pa-0"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          class="mt-3"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        scrollable
                        locale="pt-br"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menu = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date);"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2" class="pt-0">
                    <v-select
                    class="mt-0"
                    v-model="rover"
                    :items="rovers"
                    menu-props="auto"
                    label="Robô"
                    hide-details
                    prepend-icon="mdi-robot"
                    single-line
                  ></v-select>
                  </v-col>
                  <v-col cols="2">
                    <v-btn color="error" @click="search()">
                      Pesquisar
                    </v-btn>
                  </v-col>
              </v-card>
            </v-col>
            <template v-if="loading==0">
              <v-col
                v-for="img in images.photos"
                :key="`${img.id}`"
                cols="6"
                md="3"
              >
                <v-card>
                  <v-img
                    :src="img.img_src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    @click="dialog = true;viewFoto(img);"
                  >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                  </v-img>

                </v-card>
              </v-col>
            </template>
            <template v-if="loading==1">
              <v-col
                v-for="load in 16"
                :key="`${load}`"
                cols="6"
                md="3"
              >
                <v-card>
                  <v-skeleton-loader
                    max-width="100%"
                    height="200px"
                    type="card"
                  ></v-skeleton-loader>
                </v-card>
              </v-col>
            </template>
            <v-dialog
              v-model="dialog"
              max-width="100%"
              class="pt-0"
            >
              <v-card>
                <v-toolbar
                  dark
                  color="error"
                >
                  <v-toolbar-title><h3>Detalhes da foto</h3></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    dark
                    @click="dialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text class="px-0 pb-0">
                  <v-col cols="12" v-if="i > 0">
                    <v-row>
                      <v-col cols="7">
                        <img :src="image.img_src" width="100%" height="550" alt="">
                      </v-col>
                      <v-col cols="5" class="px-5 pt-5">
                        <v-card class="pa-2 grey darken-1 mb-4">
                          <h2 class="white--text">Robô</h2>
                        </v-card>
                        <h1 class="mb-10 font-weight-bolder">{{image.rover.name}}</h1>
                        <v-card class="pa-2 grey darken-1 mb-4">
                          <h2 class="white--text">Câmera</h2>
                        </v-card>
                        <h1 class="mb-10 font-weight-bolder">{{image.camera.full_name}}</h1>
                        <v-card class="pa-2 grey darken-1 mb-4">
                          <h2 class="white--text">Sol</h2>
                        </v-card>
                        <h1 class="mb-10 font-weight-bolder">{{image.sol}}</h1>
                        <v-card class="pa-2 grey darken-1 mb-4">
                          <h2 class="white--text">Data</h2>
                        </v-card>
                        <h1 class="mb-10 font-weight-bolder">{{image.earth_date | moment("DD/MM/YYYY")}}</h1>
                        <v-btn color="info" target="_blank" :href="image.img_src">
                          Link da imagem
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-dialog>
        </v-row>
      </v-container>
    </v-main>
    <div class="text-center ma-2">
      <v-snackbar
        v-model="snackbar"
      >
        Selecione um robô antes de pesquisar

        <template v-slot:action="{ attrs }">
          <v-btn
            color="error"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Entendi
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <v-footer dark fixed padless>
      <v-card class="flex" flat tile>
        <v-card-title>
          <h5>&copy; {{ new Date().getFullYear() }} — <strong>Vitor James</strong></h5>
          <v-spacer></v-spacer>
          <v-btn class="mx-3" href="#" target="_blank" dark icon>
            <v-icon size="24px">
              mdi-linkedin
            </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      snackbar: false,
      dialog: false,
      rover: null,
      loading:null,
      rovers:['Curiosity','Opportunity','Spirit'],
      api_key: "ao9hjfVGTtepu75AlOayR9N09bSaJaAR9zjPHLD5",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      i:0,
      image: {},
      images: []
    }),
    created(){
      
    },
    methods:{
      search(){
        if (this.rover == null) {
          this.snackbar = true
        }else{
          this.loading = 1;
          this.snackbar = false;
          this.axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/'+this.rover+'/photos?earth_date='+this.date+'&api_key='+this.api_key)
          .then((response) => {
            this.loading = 0;
            this.images = response.data;
          })
          .catch(() => {
            this.images = false;
          })
        }
      },
      viewFoto(img){
        this.i = 1;
        this.image = img;
      }
    }
  }
</script>