<template>
  <v-row class="pa-5">
    <v-col class="d-flex align-center">
      <v-btn variant="text" href="/" class="mx-2" size="70" flat :ripple="false">
        <v-avatar :image="calendar" size="70"/>
      </v-btn>
      <v-btn :disabled="route.path === '/freie-slots'" variant="outlined" href="/freie-slots" class="mx-2">
        <h3> Freie Termine </h3>
      </v-btn>
      <v-btn :disabled="route.path === '/meine-termine'" variant="outlined" href="/meine-termine">
        <h3> Meine Termine </h3>
      </v-btn>
      <v-btn @click="eventStore.resetEvents()">
        Reset
      </v-btn>
    </v-col>

    <v-col cols="4" class="d-flex align-center justify-end mr-5">
      <v-row>

      </v-row>
      <v-btn class="ma-3" variant="outlined" @click="toggleTheme()">
        <v-icon :icon="isDark ? 'mdi-weather-sunny': 'mdi-weather-night'" />
      </v-btn>
      <v-btn variant="outlined" class="mr-3">
          <v-badge dot color="error">
            <v-icon icon="mdi-bell-outline"/>
          </v-badge>
      </v-btn>
      <v-btn variant="text" @click="openProfileDialog = true" size="55">
        <v-avatar size="55" :image="avatar"/>
      </v-btn>
    </v-col>
  </v-row>

  <!-- TODO -->
  <v-dialog v-model="openProfileDialog" max-width="800">
      <Profile />
  </v-dialog>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import Profile from '@/components/Profile.vue'
import avatar from '@/assets/user/admin/adminAvatar.png'
import calendar from '@/assets/calendar11.png'
import { useEventsStore } from '@/store/eventStore.js'


const eventStore = useEventsStore()

const route = useRoute()
const theme = useTheme()

const openProfileDialog = ref(false)
const isDark = ref(true)
const notifications = ref(false)

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  isDark.value = !isDark.value
}
</script>

<style scoped>

</style>
