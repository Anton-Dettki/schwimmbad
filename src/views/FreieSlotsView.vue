<template>
  <v-row align="center" justify="center">
    <v-col cols="10" align-self="center">
      <v-data-table width="700" :items="items" :headers="headers">
        <template v-slot:item.start="{ value }">
          {{ date.format(value, 'fullDateTime24h') }}
        </template>
        <template v-slot:item.end="{ value }">
          {{ date.format(value, 'fullDateTime24h') }}
        </template>
        <template v-slot:item.id="{ value }">
          <v-btn @click="book(value)" variant="tonal" color="primary"> Termin Buchen </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-dialog v-model="openBookedDialog" max-width="600">
    <v-card>
      <v-card-title class="mt-4">
        <v-row align="center">
          <v-icon icon="mdi-check-bold" color="success" class="ma-3"/>
          <h4> Termin erfolgreich gebucht </h4>
        </v-row>
      </v-card-title>
      <v-card-text>
        Du hast den Termin an <strong>{{ date.format(bookedEvent.start, 'fullDate') }} </strong> erfolgreich Gebucht.
        <v-spacer/>
        Aktualisiere als nächstes die Daten des Termins, so dass Eltern und Mitarbeiter Informiert sind.
      </v-card-text>
      <v-card-actions>
        <v-btn @click="openBookedDialog = false" variant="outlined"> Zurück zu freien Terminen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { calendarEvents, user } from '@/store/eventStore.js'
import { computed, ref } from 'vue'
import { useDate } from 'vuetify/framework'

const date = useDate()

const openBookedDialog = ref(false)
const bookedEvent = ref({})

const items = computed(() => {
  return calendarEvents.value.filter((e) => e.calendarId === "Frei")
})
const headers = computed(() => {
  return [
    { title: 'Ort', value: 'location', sortable: true},
    { title: 'Start', value: 'start', sortable: true},
    { title: 'Ende', value: 'end', sortable: true},
    { title: 'Buchen', value: 'id'}
  ]
})

function book(id) {
  console.log('Booking event:', id)

  const index = calendarEvents.value.findIndex(e => e.id === id)
  if (index === -1) {
    console.warn('Event not found')
    return
  }
  bookedEvent.value = calendarEvents.value[index]
  openBookedDialog.value = true

  calendarEvents.value[index].calendarId = user.kita
  calendarEvents.value[index].title = 'Gebucht'
}

</script>

<style scoped>

</style>
