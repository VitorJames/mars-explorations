<template>
  <v-app-bar dark app> 
    <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
    <v-avatar
      color="deep-orange darken-3"
      class="mr-3"
      size="48"
    >
      <img src="./../assets/473346-PGQPSZ-396-ai.png" alt="">
    </v-avatar>
    <v-toolbar-title>MARS <small class="text-uppercase font-weight-thin white--text">EXPLORATIONS</small></v-toolbar-title>
    <!-- <v-spacer></v-spacer> -->
    <!-- <v-icon :disabled="mode">mdi-white-balance-sunny</v-icon>
    <v-switch
      v-model="mode"
      class="mt-5 ml-3 mr-1"
    ></v-switch>
    <v-icon :disabled="!mode">mdi-weather-night</v-icon> -->
    <!-- <v-btn text color="error" class="mr-3">
      Fotos
    </v-btn>
    <v-btn text color="error" class="mr-3">
      Missões
    </v-btn>
    <v-btn text color="error">
      Robôs
    </v-btn> -->
  </v-app-bar>
</template>

<script>
export default {
    data: () => ({
        mode: false
    })
}
</script>

<style>

</style>