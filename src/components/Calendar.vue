<template>
  <ScheduleXCalendar :calendar-app="calendarApp" >
    <template #interactiveModalAdditionalFields="{ calendarEvent }">
      <v-card variant="text">
        <v-row class="mb-2">
          <v-col cols="3">
            <p> <v-icon icon="mdi-human-male-board" class="mr-1" size="x-small"/> {{ aufsicht(calendarEvent.id) }} </p>
          </v-col>
          <v-col>
            <v-icon icon="mdi-human-male-child" class="mr-1"  size="x-small"/>
            Klasse: {{ klasse(calendarEvent.id) }}
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
import { calendarEvents, user } from '@/store/eventStore.js'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createSidebarPlugin } from '@sx-premium/sidebar'
import { createInteractiveEventModal } from '@sx-premium/interactive-event-modal'
import { useTheme } from 'vuetify/framework'
import { computed, shallowRef, watch } from 'vue'
import { createInputField } from "@sx-premium/interactive-event-modal";

const theme = useTheme()
const currentTheme = computed(() => theme.global.name.value)

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
  isEventEditable: (event) => { return event.calendarId === user.kita },
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
      colorName: 'personal',
      lightColors: {
        main: '#f9d71c',
        container: '#fff5aa',
        onContainer: '#594800',
      },
      darkColors: {
        main: '#fff5c0',
        onContainer: '#fff5de',
        container: '#c1af2b',
      },
    },
    KitaElbkinder: {
      colorName: 'work',
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
      colorName: 'leisure',
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
      colorName: 'school',
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
      colorName: 'Frei',
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
  events: calendarEvents.value,
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
  plugins: [eventModal, dragAndDrop, calendarControls, eventsService, sidebar]
}))

function changeEventStatus(event, status) {
  event.calendarId = status
  const index = calendarEvents.value.findIndex(e => e.id === event.id)

  const updatedEvent = {
    id: event.id,
    title: status === 'Frei' ? 'Freier Slot' : event.title,
    start: event.start,
    end: event.end,
    calendarId: status,
    klasse: status === 'Frei' ? '' : event.klasse,
    aufsicht: status === 'Frei' ? '' : event.aufsicht
  }

  calendarEvents.value[index] = updatedEvent
  eventsService.update(updatedEvent)
  eventModal.close()
}

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
