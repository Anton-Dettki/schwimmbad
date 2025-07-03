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
import avatar from '@/assets/user/admin/adminAvatar.png'
import { computed } from 'vue'
import { useEventsStore } from '@/store/eventStore.js'

const eventStore = useEventsStore()

const user = computed(() => eventStore.user)
</script>

<style scoped>

</style>
