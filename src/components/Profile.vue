<template>
  <v-card>
    <v-card-title>
      <v-row class="ma-1" align="center">
        <v-avatar class="mr-3" size="50" :image="avatar" />
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
import avatar from '@/assets/user/admin/adminAvatar.png'

</script>

<style scoped>

</style>
