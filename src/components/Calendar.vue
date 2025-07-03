<template>
  <ScheduleXCalendar :calendar-app="calendarApp" >
    <template #interactiveModalAdditionalFields="{ calendarEvent }">
      <v-card variant="text">
            <v-row class="mt-1 ml-1">
              <v-icon icon="mdi-school-outline" class="mr-1" size="small"/>
              {{kita(calendarEvent.id) }}
            </v-row>
            <v-row>
              <v-col>
                <v-icon icon="mdi-human-male-board" class="mr-1" size="small"/> {{ aufsicht(calendarEvent.id) }}
              </v-col>
              <v-col>
                <v-icon icon="mdi-human-male-child" class="mr-1"  size="small"/> Klasse: {{ klasse(calendarEvent.id) }}
              </v-col>
            </v-row>

        <v-row class="my-2 ml-3">
          <v-btn v-if="calendarEvent.calendarId === user.kita" @click="changeEventStatus(calendarEvent, 'Frei')" variant="tonal">
            Freigeben
          </v-btn>
          <v-btn v-if="calendarEvent.calendarId === 'Frei'" @click="changeEventStatus(calendarEvent, user.kita)" variant="tonal">
            Buchen
          </v-btn>
        </v-row>
      </v-card>
    </template>
  </ScheduleXCalendar>
</template>

<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/sidebar/index.css'
import '@schedule-x/theme-default/dist/time-picker.css'
import '@sx-premium/sidebar/index.css'
import '@sx-premium/interactive-event-modal/index.css'
import '@schedule-x/theme-default/dist/time-picker.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createSidebarPlugin } from '@sx-premium/sidebar'
import { createInteractiveEventModal } from '@sx-premium/interactive-event-modal'
import { useTheme } from 'vuetify/framework'
import { computed, onMounted, shallowRef, watch } from 'vue'
import { createInputField } from "@sx-premium/interactive-event-modal";
import { useEventsStore } from '@/store/eventStore.js'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import { useUserStore } from '@/store/userStore.js'

const userStore = useUserStore()
const eventStore = useEventsStore()
const theme = useTheme()

const currentTheme = computed(() => theme.global.name.value)
const calendarEvents = computed(() => eventStore.events)
const user = computed(() => userStore.currentUser)

const visibleEvents = computed(() => {
  console.log(user.value.name)
  return calendarEvents.value.filter(event => {
    const calendarAllowed = user.value.calendars.includes(event.calendarId)
    const locationAllowed = !user.value.isIns || event.location === user.value.location

    return calendarAllowed && locationAllowed
  })
})

const eventsService = createEventsServicePlugin()
const calendarControls = createCalendarControlsPlugin()
const dragAndDrop = createDragAndDropPlugin()
const aufsichtInputField = createInputField({
  label: 'Aufsicht',
  type: 'text',
  onChange: (newAufsicht) => {
    eventModal.formValues.value = {
      ...eventModal.formValues.value,
      aufsicht: newAufsicht,
    }
  }
})
const klasseInputField = createInputField({
  label: 'Klasse',
  type: 'text',
  onChange: (value) => {
    eventModal.formValues.value = {
      ...eventModal.formValues.value,
      klasse: value,
    }
  }
})
const eventModal = createInteractiveEventModal({
  eventsService,
  onAddEvent: (event) => {
    console.log(event)
  },
  onDeleteEvent: (eventId) => {
    console.log(eventId)
  },
  isEventEditable: (event) => { return event.calendarId === user.value.kita },
  fields: {
    title: {},
    startDate: {},
    startTime: {},
    endDate: {},
    endTime: {},
  },
  customFields: {
    aufsicht: aufsichtInputField,
    klasse: klasseInputField
  }
})
const sidebar = createSidebarPlugin({
  eventsService,
  openOnRender: false,
  activeCalendarIds: ['Frei', 'Sternipark', 'KitaWasserfreunde', 'KitaRegenbogen', 'KitaElbkinder'],
  hasCalendarToggles: true,
})
const calendarApp = shallowRef(createCalendar({
  theme: 'dark',
  calendars: {
    Frei: {
      label: 'Frei',
      colorName: 'Frei',
      lightColors: {
        main: '#f9d71c',
        container: '#fff5aa',
        onContainer: '#594800',
      },
      darkColors: {
        main: '#fff5c0',
        onContainer: '#fff5de',
        container: '#cabb55',
      },
    },
    KitaElbkinder: {
      label: 'Kita Elbkinder',
      colorName: 'KitaElbkinder',
      lightColors: {
        main: '#f91c45',
        container: '#ffd2dc',
        onContainer: '#59000d',
      },
      darkColors: {
        main: '#ffc0cc',
        onContainer: '#ffdee6',
        container: '#a24258',
      },
    },
    KitaRegenbogen: {
      label: 'Kita Regenbogen',
      colorName: 'KitaRegenbogen',
      lightColors: {
        main: '#1cf9b0',
        container: '#dafff0',
        onContainer: '#004d3d',
      },
      darkColors: {
        main: '#c0fff5',
        onContainer: '#e6fff5',
        container: '#42a297',
      },
    },
    KitaWasserfreunde: {
      label: 'Kita Wasserfreunde',
      colorName: 'KitaWasserfreunde',
      lightColors: {
        main: '#1c7df9',
        container: '#d2e7ff',
        onContainer: '#002859',
      },
      darkColors: {
        main: '#c0dfff',
        onContainer: '#dee6ff',
        container: '#426aa2',
      },
    },
    Sternipark: {
      label: 'Sternipark',
      colorName: 'Sternipark',
      lightColors: {
        main: '#6333d5',         // dark teal
        container: '#dad1f6',    // soft teal for background contrast
        onContainer: '#001F25',  // nearly black for clear text
      },
    }},
  selectedDate: '2025-06-02',
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
    createViewMonthAgenda(),
  ],
  events: visibleEvents.value,
  dayBoundaries: {
    start: '08:00',
    end: '19:00'
  },
  firstDayOfWeek: 1,
  weekOptions: {
    gridHeight: 550,
    nDays: 5
  },
  callbacks: {
    onEventClick(calendarEvent) {
      console.log('onEventClick', calendarEvent)
    },
    onDoubleClickDateTime(dateTime) {
      eventModal.clickToCreate(dateTime, {
        id: 'some-event-id',
      })
    },
    onEventUpdate(updatedEvent) {
      console.log('Event updated:', updatedEvent)

      // Sync your calendarEvents reactive array
      const index = calendarEvents.value.findIndex(e => e.id === updatedEvent.id)
      if (index !== -1) {
        calendarEvents.value[index] = { ...updatedEvent }
      }

      // Optionally inform the eventsService plugin
      eventsService.update(updatedEvent)
    },
    // other callbacks...
  },
  plugins: [eventModal, dragAndDrop, calendarControls, eventsService, sidebar, createCurrentTimePlugin()]
}))

function changeEventStatus(event, status) {
  eventStore.changeEventStatus(event, status)

  eventsService.update(findById(event.id))
  eventModal.close()
}

onMounted(() => {
  console.log(user.value.calendars)})

watch(user, (newUser) => {
  calendarControls.setCalendars(newUser.calendars)
})

function findById(id){
  const index = calendarEvents.value.findIndex(e => e.id === id)
  return calendarEvents.value[index]
}

function aufsicht(id) {
  return findById(id).aufsicht
}

function klasse(id) {
  return findById(id).klasse
}

function kita(id) {
  return findById(id).calendarId
}

watch(currentTheme, (newTheme) => {
  if (newTheme === 'dark') {
    calendarApp.value.setTheme('dark')
  } else {
    calendarApp.value.setTheme('light')
  }
})
</script>

<style scoped>

</style>
