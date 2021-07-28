<template>
  <v-app>
    <AppBar />
    <v-main>
      <FindImages />
    </v-main>
  </v-app>
</template>

<script>
import FindImages from "./components/FindImages";
import AppBar from "./components/AppBar";

export default {
  components: {
    FindImages,
    AppBar
  },

  data: () => ({
    //
  })
};
</script>
