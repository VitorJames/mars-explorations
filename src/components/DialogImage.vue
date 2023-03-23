<template>
  <v-dialog v-model="modal" max-width="100%" fullscreen class="pt-0">
    <v-card>
      <v-toolbar dark color="error">
        <v-toolbar-title><h3>Detalhes da foto</h3></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="px-0 pb-0">
        <v-col cols="12">
          <v-row>
            <v-col cols="12" lg="7" md="7" sm="7" class="px-2">
              <v-img :src="photo.img_src" width="100%"></v-img>
            </v-col>
            <v-col cols="12" lg="5" md="5" sm="5" class="px-2 pt-3">
              <v-card class="pa-2 grey darken-1 mb-3">
                <h3 class="white--text">Rover</h3>
              </v-card>
              <h2 class="mb-6 font-weight-bolder">{{ photo.rover.name }}</h2>
              <v-card class="pa-2 grey darken-1 mb-3">
                <h3 class="white--text">Câmera</h3>
              </v-card>
              <h2 class="mb-6 font-weight-bolder">
                {{ photo.camera.full_name }}
              </h2>
              <v-card class="pa-2 grey darken-1 mb-3">
                <h3 class="white--text">Sol</h3>
              </v-card>
              <h2 class="mb-6 font-weight-bolder">{{ photo.sol }}</h2>
              <v-card class="pa-2 grey darken-1 mb-3">
                <h3 class="white--text">Data</h3>
              </v-card>
              <h2 class="mb-6 font-weight-bolder">
                {{ photo.earth_date | formatDate }}
              </h2>
              <!-- <v-btn
                color="info"
                :download="`${photo.rover.name}_${photo.camera.full_name}_${photo.sol}`"
                block
                :href="photo.img_src"
                large
              >
                <v-icon>mdi-download</v-icon>
                Download da imagem
              </v-btn> -->
            </v-col>
          </v-row>
        </v-col>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { format, parseISO } from "date-fns";
export default {
  props:{
    dialog: {
      type:Boolean,
      default: false
    },
    image: {
      type:Object,
      default: () => ({
        img_src: '',
        earth_date: '2004-01-05',
        sol: '',
        rover: {
          name: ''
        },
        camera: {
          full_name: ''
        }
      })
    },
  },
  data: () => ({
    modal: false,
    photo: {
      img_src: '',
      earth_date: '2004-01-05',
      sol: '',
      rover: {
        name: ''
      },
      camera: {
        full_name: ''
      }
    }
  }),
  watch:{
    dialog(val){
      this.modal = val;
    },
    image:{
      handler(val){
        this.photo = val;
      }
    }
  },
  created(){
    // console.clear();
  },
  filters:{
    formatDate(date){
      return format(parseISO(date), "dd/MM/yyyy");
    }
  },
  methods: {
    close(){
      this.modal = false
      this.$emit('closeDialog', this.modal);
    },
  },
};
</script>