<template>
  <v-container class="pb-12">
    <v-col cols="12" v-if="!loading">
      <v-row justify="center" v-for="mission in rovers" :key="mission">
        <v-col cols="12" xl="6" lg="7" md="8" class="px-1">
          <v-card class="mx-auto" width="100%" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-h6 mb-4">{{ finishedMissions[mission].name }}</div>

                <v-list-item-title class="text-overline mb-1">
                  Lançamento
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ finishedMissions[mission].launch_date | formatDate }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Chegada à Marte
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ finishedMissions[mission].landing_date | formatDate }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Status da missão
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ finishedMissions[mission].status | formatStatus }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Sol máximo
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ finishedMissions[mission].max_sol }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Data da última foto
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ finishedMissions[mission].max_date | formatDate }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Total de fotos
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ finishedMissions[mission].total_photos }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile :size="roverPhotoSize">
                <v-img :src="require(`../assets/${finishedMissions[mission].name}_rover.jpg`)" contain></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        dark
        size="74"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
export default {
  data:() => ({
    loading: true,
    rovers: ['spirit','opportunity','curiosity','perseverance'],
    finishedMissions: {
      spirit: {},
      opportunity: {},
      curiosity: {},
      perseverance: {}
    }
  }),
  filters: {
    formatDate(date) {
      return format(parseISO(date), "dd/MM/yyyy");
    },
    formatStatus(status) {
      var formats = {
        complete: "Completa",
        active: "Ativa"
      };

      return formats[status];
    },
  },
  created(){
    this.getCuriosityMission();
  },
  computed: {
    roverPhotoSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 120
        case 'sm': return 120
        case 'md': return 220
        case 'lg': return 320
        case 'xl': return 350
      }
    },
  },
  methods:{
     getCuriosityMission(){
      this.rovers.forEach((hoverName) => {
        this.axios
          .get(`/v1/manifests/${hoverName}?api_key=${this.$apiKey}`)
          .then((response) => {
            var mission = response.data.photo_manifest;

            this.finishedMissions[hoverName] = {
              name: mission.name,
              landing_date: mission.landing_date,
              launch_date: mission.launch_date,
              status: mission.status,
              max_sol: mission.max_sol,
              max_date: mission.max_date,
              total_photos: mission.total_photos
            };
            
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      });
    }
  }
};
</script>

<style>
</style>