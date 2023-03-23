<template>
  <v-app-bar dark app color="grey darken-4">
    <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
    <v-avatar color="deep-orange darken-3" class="mr-3" size="47">
      <img src="./../assets/473346-PGQPSZ-396-ai.png" alt="" />
    </v-avatar>
    <v-toolbar-title
      >MARS
      <small class="text-uppercase font-weight-thin white--text"
        >EXPLORATIONS</small
      ></v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-icon :disabled="mode">mdi-white-balance-sunny</v-icon>
    <v-switch v-model="mode" class="mt-5 ml-3 mr-1" color="red"></v-switch>
    <v-icon :disabled="!mode">mdi-weather-night</v-icon>
    
    <template v-slot:extension>
      <v-sheet width="100%" dark class="px-0">
        <v-tabs right fixed-tabs background-color="grey darken-4" color="error">
          <v-tab to="/">Home</v-tab>
          <v-tab to="/rovers">Rovers</v-tab>
          <v-tab to="/about">Sobre</v-tab> 
        </v-tabs>
      </v-sheet>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    mode: false,
  }),
  watch: {
    mode(val) {
      localStorage.setItem("mars_explorations_theme", val);
      this.$vuetify.theme.dark = val;
    },
  },
  created() {
    var local_mode = localStorage.getItem("mars_explorations_theme");

    this.mode =
      local_mode !== null
        ? (this.$vuetify.theme.dark = local_mode === "true")
        : (this.$vuetify.theme.dark = false);

    if (local_mode === null) {
      localStorage.setItem("mars_explorations_theme", false);
      this.$vuetify.theme.dark = false;
    }
  },
};
</script>

<style>
</style>