<template>
      <v-row class="pa-5" v-if="route.path !== '/logout'">
        <v-col class="d-flex align-center">
          <v-btn variant="text" href="/" class="mx-2" size="70" flat :ripple="false">
            <v-avatar :image="calendar" size="70" />
          </v-btn>
          <v-btn :disabled="route.path === '/freie-slots'" variant="outlined" href="/freie-slots" class="mx-2">
            <h3> Freie Termine </h3>
          </v-btn>
          <v-btn :disabled="route.path === '/meine-termine'" variant="outlined" href="/meine-termine">
            <h3> Meine Termine </h3>
          </v-btn>
        </v-col>

        <v-col cols="4" class="d-flex align-center justify-end mr-5">
          <v-btn class="ma-3" variant="outlined" @click="toggleTheme">
            <v-icon :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
          </v-btn>
          <v-menu location="bottom end" transition="scale-transition">
            <template #activator="{ props }">
              <v-btn v-bind="props" variant="outlined" class="mr-3">
                <v-badge v-if="notifications.length !== 0" dot color="error">
                  <v-icon icon="mdi-bell-outline" />
                </v-badge>
                <v-icon v-else icon="mdi-bell-outline" />
              </v-btn>
            </template>
            <v-list v-if="notifications.length !== 0">
              <v-list-item v-for="(item, key) in notifications" :key="key">
              <v-row class="ma-2" align="center">
                <strong> {{ item.person.name }} </strong> . hat ein Event am {{ date.format(item.start, 'fullDate')}}
                {{ item.type === 'booked'? 'gebucht':'veröffentlicht'}}
                <v-btn @click.stop="eventStore.markAsRead(item)" variant="text" icon class="pa-0 ma-0 ml-2 no-hover">
                  <v-icon size="x-small" icon="mdi-trash-can-outline" color="error"/>
                </v-btn>
              </v-row>
              </v-list-item>
            </v-list>
            <v-list v-else min-width="550">
              <v-row class="ma-2">
                Keine neuen Benachrichtigungen
              </v-row>
            </v-list>

          </v-menu>
          <v-menu location="bottom end" transition="scale-transition">
            <template #activator="{ props }">
              <div v-bind="props" variant="text" size="55">
                <v-avatar size="55" :image="avatar" />
              </div>
            </template>
            <v-list>
              <v-list-item>
                <h4> {{ user.name }} </h4>
              </v-list-item>
              <v-list-item @click="logout" title="Logout" prepend-icon="mdi-logout" />
              <v-list-item @click="quickSwitch" title="Quick Switch" prepend-icon="mdi-account-switch-outline" />
              <v-list-item @click="eventStore.resetEvents()" title="Reset" prepend-icon="mdi-step-backward"/>

            </v-list>
          </v-menu>
        </v-col>
      </v-row>

</template>


<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import avatar from '@/assets/user/admin/adminAvatar.png'
import calendar from '@/assets/calendar11.png'
import { useEventsStore } from '@/store/eventStore.js'
import { useDate } from 'vuetify/framework'

const route = useRoute()
const router = useRouter()
const theme = useTheme()
const date = useDate()
const eventStore = useEventsStore()

const isDark = ref(true)
const drawer = ref(false)

const notifications = computed(() => eventStore.notifications)
const user = computed(() => eventStore.user)

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  isDark.value = !isDark.value
}

function logout() {
  // Add your logout logic here
  console.log('Logging out...')
  drawer.value = false
  router.push('/logout')
}

function quickSwitch () {
  drawer.value = false
  router.push('/switch')
}
</script>


<style scoped>

</style>
