<template>
  <v-footer dark fixed padless>
    <v-card class="flex" flat tile>
      <v-card-title class="py-0 pr-0">
        <h5>&copy; {{ new Date().getFullYear() }}</h5>
        <v-spacer></v-spacer>
        <v-btn
          href="https://www.linkedin.com/in/vitor-james2/"
          target="_blank"
          dark
          text
        >
          <v-icon size="24px" class="mr-1"> mdi-linkedin </v-icon>
          Vitor James
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {};
</script>

<style>
</style>