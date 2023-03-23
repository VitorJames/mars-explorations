<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";

export default {
  components: {
    AppBar,
    Footer
  },

  data: () => ({
    //
  })
};
</script>
