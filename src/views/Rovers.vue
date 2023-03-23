<template>
  <v-container class="pb-12">
    <v-col cols="12" v-if="!loading">
      <v-row justify="center" v-for="mission in finishedMissions" :key="mission.name">
        <v-col cols="12" xl="6" lg="7" md="8" class="px-1">
          <v-card class="mx-auto" width="100%" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-h6 mb-4">{{ mission.name }}</div>

                <v-list-item-title class="text-overline mb-1">
                  Lançamento
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ mission.launch_date | formatDate }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Chegada à Marte
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ mission.landing_date | formatDate }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Status da missão
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ mission.status | formatStatus }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Sol máximo
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ mission.max_sol }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Data da última foto
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ mission.max_date | formatDate }}
                </v-list-item-subtitle>

                <v-list-item-title class="text-overline mb-1">
                  Total de fotos
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  {{ mission.total_photos }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="120">
                <v-img :src="require(`../assets/${mission.name}.png`)" contain></v-img>
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
    finishedMissions: [
      {
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
        max_sol: 2208,
        max_date: "2010-03-21",
        total_photos: 124550
      },
      {
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
        max_sol: 5111,
        max_date: "2018-06-11",
        total_photos: 198439
      }
    ]
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
  methods:{
    getCuriosityMission(){
      this.axios
          .get(
            "/v1/manifests/curiosity?api_key=" +
              this.$apiKey
          )
          .then((response) => {
            var mission = response.data.photo_manifest;

            this.finishedMissions.push({
              name: mission.name,
              landing_date: mission.landing_date,
              launch_date: mission.launch_date,
              status: mission.status,
              max_sol: mission.max_sol,
              max_date: mission.max_date,
              total_photos: mission.total_photos
            });
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
    }
  }
};
</script>

<style>
</style>