<template>
  <v-app>
    <v-container fluid>
        <v-row justify="center">
            <v-col
              class="mt-0"
              cols="12"
              lg="8"
            >
              <v-card class="d-flex align-center" elevation="5" outlined :dark="$vuetify.theme.dark">
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="6" lg="5" sm="5">
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
                              v-model="computedDateFormatted"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              hide-details
                              class="pt-0"
                              color="error"
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
                      <v-col cols="6" lg="5" sm="5" class="pt-0">
                        <v-select
                        v-model="rover"
                        :items="rovers"
                        menu-props="auto"
                        label="Rover"
                        hide-details
                        prepend-icon="mdi-robot"
                        single-line
                        color="error"
                      ></v-select>
                      </v-col>
                      <v-col cols="12" md="2" sm="2">
                        <v-btn color="error"  block @click="search()">
                          <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
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
                <v-card style="cursor:pointer !important;">
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
              fullscreen
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
                      <v-col cols="12" lg="7" md="7" sm="7" class="px-2">
                        <v-img
                          :src="image.img_src"
                          width="100%"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" lg="5" md="5" sm="5" class="px-2 pt-3">
                        <v-card class="pa-2 grey darken-1 mb-3">
                          <h3 class="white--text">Rover</h3>
                        </v-card>
                        <h2 class="mb-6 font-weight-bolder">{{image.rover.name}}</h2>
                        <v-card class="pa-2 grey darken-1 mb-3">
                          <h3 class="white--text">Câmera</h3>
                        </v-card>
                        <h2 class="mb-6 font-weight-bolder">{{image.camera.full_name}}</h2>
                        <v-card class="pa-2 grey darken-1 mb-3">
                          <h3 class="white--text">Sol</h3>
                        </v-card>
                        <h2 class="mb-6 font-weight-bolder">{{image.sol}}</h2>
                        <v-card class="pa-2 grey darken-1 mb-3">
                          <h3 class="white--text">Data</h3>
                        </v-card>
                        <h2 class="mb-6 font-weight-bolder">{{image.earth_date | moment("DD/MM/YYYY")}}</h2>
                        <v-btn color="info" :download="`${image.rover.name}_${image.camera.full_name}_${image.sol}`" block :href="image.img_src" large>
                          <v-icon>mdi-download</v-icon>
                          Download da imagem
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-row>
      </v-container>
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
        <v-card-title class="py-0">
          <h5>&copy; {{ new Date().getFullYear() }}</h5>
          <v-spacer></v-spacer>
          <v-btn href="https://www.linkedin.com/in/vitor-james2/" target="_blank" dark text>
            <v-icon size="24px" class="mr-1">
              mdi-linkedin
            </v-icon>
            Vitor James
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { format, parseISO } from 'date-fns'
  export default {
    data: () => ({ 
      drawer: null,
      snackbar: false,
      controls: false,
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
      this.checkScroll();
    },
    computed: {
      computedDateFormatted () {
        return format(parseISO(this.date), "dd/MM/yyyy");
      },
    },
    methods:{
      checkScroll(){
        var y = window.scrollY;
        if (y >= 10) {
          this.controls = true;
        } else {
          this.controls = false;
        }
      },
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