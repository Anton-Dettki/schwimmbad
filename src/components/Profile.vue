<template>
  <v-card>
    <v-card-title>
      <v-row class="ma-1" align="center">
        <v-avatar size="50" image="/src/assets/user/admin/adminAvatar.png" class="mr-3"/>
        <h3> {{ user.name }} </h3>
      </v-row>
    </v-card-title>
    <v-card-text>
      aa
    </v-card-text>
  </v-card>
</template>

<script setup>
import { user } from '../store/eventStore.js'

</script>

<style scoped>

</style>
