<template>
  <v-app>
    <DialogImage :dialog="dialog" :image="image" @closeDialog=" dialog = $event" />
    <v-container fluid class="pb-12">
      <v-row justify="center">
        <v-col class="mt-0" cols="12" lg="8">
          <v-card
            class="d-flex align-center"
            elevation="5"
            outlined
            :dark="$vuetify.theme.dark"
          >
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
                      <v-btn text color="primary" @click="menu = false">
                        Cancelar
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
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
                  <v-btn color="error" block @click="search()">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <template v-if="!loading && images.photos && images.photos.length > 0">
          <v-col
            v-for="img in images.photos"
            :key="`${img.id}`"
            cols="6"
            md="3"
          >
            <v-card style="cursor: pointer !important">
              <v-img
                :src="img.img_src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                @click="
                  dialog = true;
                  viewFoto(img);
                "
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
        <template v-if="loading">
          <v-col v-for="load in 16" :key="`${load}`" cols="6" md="3">
            <v-card>
              <v-skeleton-loader
                max-width="100%"
                height="200px"
                type="card"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
        </template>
        <template v-if="!loading && !images.photos">
          <v-col cols="12" lg="6" md="6" sm="8" class="pt-10">
            <v-row class="text-h5 justify-center pb-10">Escolha uma data e um rover</v-row>
            <v-row>
              <v-img :src="require(`../assets/pic_${randomPicNumber}.png`)" contain></v-img>
            </v-row>
          </v-col>
        </template>
      </v-row>
      <v-fab-transition>
        <v-btn
          color="error"
          class="mb-8"
          dark
          fixed
          bottom
          right
          fab
          v-scroll="onScroll"
          v-show="scroll"
          @click="top()"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        Selecione um robô antes de pesquisar

        <template v-slot:action="{ attrs }">
          <v-btn color="error" text v-bind="attrs" @click="snackbar = false">
            Entendi
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>
  
  <script>
import { format, parseISO, isWithinInterval } from "date-fns";
import DialogImage from '../components/DialogImage.vue';
export default {
  components:{
    DialogImage
  },
  data: () => ({
    snackbar: false,
    dialog: false,
    rover: null,
    scroll: false,
    randomPicNumber: Math.floor(Math.random() * (4 - 1 + 1)) + 1,
    loading: false,
    rovers: [],
    selectedImage: null,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    i: 0,
    image: {
      img_src: '',
      earth_date: '2004-01-05',
      sol: '',
      rover: {
        name: ''
      },
      camera: {
        full_name: ''
      }
    },
    images: [],
  }),
  created() {
    // console.clear();
  },
  computed: {
    computedDateFormatted() {
      return format(parseISO(this.date), "dd/MM/yyyy");
    },
  },
  watch: {
    date(val) {
      this.checkRoverByDate(val);
    },
  },
  methods: {
    search() {
      if (this.rover == null) {
        this.snackbar = true;
      } else {
        this.loading = 1;
        this.snackbar = false;
        this.axios
          .get(
            "/v1/rovers/" +
              this.rover +
              "/photos?earth_date=" +
              this.date +
              "&api_key=" +
              this.$apiKey
          )
          .then((response) => {
            this.loading = 0;
            this.images = response.data;
          })
          .catch(() => {
            this.images = false;
          });
      }
    },
    viewFoto(img) {
      this.image = img;
      this.dialog = true;
    },
    checkRoverByDate(date) {
      this.rover = null;
      this.rovers = [];

      var missions = {
        spirit: {
          start: parseISO("2004-01-05"),
          end: parseISO("2010-03-21"),
        },
        opportunity: {
          start: parseISO("2004-01-26"),
          end: parseISO("2018-06-11"),
        },
        curiosity: {
          start: parseISO("2012-08-06"),
          end: parseISO(new Date().toISOString().substr(0, 10)),
        },
      };

      Object.keys(missions).map((rover) => {
        var checkRover = isWithinInterval(parseISO(date), missions[rover]);

        if (checkRover) {
          var word = rover;
          var formatedWord = word.charAt(0).toUpperCase() + word.slice(1);

          this.rovers.push(formatedWord);
        }
      });

      if (this.rovers.length == 1) {
        this.rover = this.rovers[0];
        this.search();
      }
    },
    onScroll (e) {
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.scroll = top > 50 && this.images.photos && this.images.photos.length > 0;
    },
    top () {
      this.$vuetify.goTo(0)
    }
  },
};
</script>