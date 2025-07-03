<template>
  <v-row align="center" justify="center">
    <v-col cols="10" align-self="center">
      <v-data-table width="700" :items="items" :headers="headers">
        <template v-slot:item.start="{ item }">
          {{ date.format(item.start, 'fullDateTime24h') }} - {{ date.format(item.end, 'fullTime24h') }}
        </template>
        <template v-slot:item.id="{ value }">
          <v-btn @click="book(value)" variant="tonal" color="primary"> Termin freigeben </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-dialog v-model="openBookedDialog" max-width="600">
    <v-card>
      <v-card-title class="mt-4">
        <v-row align="center" justify="center">
          <v-icon icon="mdi-check-bold" color="success" class="ma-3"/>
          <h4> Termin erfolgreich freigegeben </h4>
        </v-row>
      </v-card-title>
      <v-card-text class="justify-center">
        Du hast den Termin an <strong>{{ date.format(bookedEvent.start, 'fullDate') }} </strong> erfolgreich freigegeben.
        Jetzt können andere Kitas diesen Termin buchen. Eltern und Aufsichtsperson werden über die Terminänderung informiert.
      </v-card-text>
      <v-card-actions>
        <v-btn @click="openBookedDialog = false" variant="outlined"> Zurück zu freien Terminen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useEventsStore } from '@/store/eventStore.js'
import { computed, ref } from 'vue'
import { useDate } from 'vuetify/framework'

const date = useDate()
const eventStore = useEventsStore()

const calendarEvents = computed(() => eventStore.events)
const user = computed(() => eventStore.user)
const openBookedDialog = ref(false)
const bookedEvent = ref({})

const items = computed(() => {
  return calendarEvents.value.filter((e) => e.calendarId === user.value.kita)
})
const headers = [
  { title: 'Name', value: 'title' },
  { title: 'Uhrzeit', value: 'start' },
  { title: 'Aufsicht', value: 'aufsicht' },
  { title: 'Klasse', value: 'klasse' },
  { title: 'Ort', value: 'location' },
  { title: 'Freigeben', value: 'id' },
]

function book(id) {
  console.log('Releasing event:', id)

  const index = calendarEvents.value.findIndex(e => e.id === id)
  bookedEvent.value = calendarEvents.value[index]
  openBookedDialog.value = true
  eventStore.changeEventStatus({id: id}, 'Frei')
}

</script>

<style scoped>

</style>
