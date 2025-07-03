import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useEventsStore = defineStore('events', () => {
  const events = ref([
    {
      id: 11,
      title: "Anfängerkurs Schwimmen",
      start: "2025-07-07 09:00",
      end: "2025-07-07 10:30",
      klasse: "1a",
      aufsicht: "Fr. Schneider",
      location: "Ifflandstraße 21, 22087",
      calendarId: "Sternipark"
    },
    {
      id: 12,
      title: "Wasserspiele für Kinder",
      start: "2025-07-07 11:00",
      end: "2025-07-07 12:30",
      klasse: "2b",
      aufsicht: "Hr. Krause",
      location: "Holstenstraße 30, 22767",
      calendarId: "KitaRegenbogen"
    },
    {
      id: 13,
      title: "Bronze-Abzeichen Vorbereitung",
      start: "2025-07-08 10:00",
      end: "2025-07-08 11:30",
      klasse: "3c",
      aufsicht: "Fr. Lange",
      location: "Elbgaustraße 110, 22523",
      calendarId: "KitaWasserfreunde"
    },
    {
      id: 14,
      title: "Spielzeit im Wasser",
      start: "2025-07-08 13:00",
      end: "2025-07-08 14:30",
      klasse: "1b",
      aufsicht: "Hr. Fröhlich",
      location: "Hohe Weide 15, 20259",
      calendarId: "Sternipark"
    },
    {
      id: 15,
      title: "Silber-Abzeichen Training",
      start: "2025-07-09 08:45",
      end: "2025-07-09 10:15",
      klasse: "4a",
      aufsicht: "Fr. König",
      location: "Basselweg 28, 22527",
      calendarId: "KitaLöwenzahn"
    },
    {
      id: 16,
      title: "Wassergewöhnung für Vorschulkinder",
      start: "2025-07-09 10:30",
      end: "2025-07-09 12:00",
      klasse: "2c",
      aufsicht: "Hr. Urban",
      location: "Budapester Straße 29, 20359",
      calendarId: "Sternipark"
    },
    {
      id: 17,
      title: "Schwimmkurs Fortgeschrittene",
      start: "2025-07-10 09:00",
      end: "2025-07-10 10:30",
      klasse: "3b",
      aufsicht: "Fr. Neumann",
      location: "Möllner Landstraße 207, 22117",
      calendarId: "KitaElbkinder"
    },
    {
      id: 18,
      title: "Freier Termin",
      start: "2025-07-10 11:00",
      end: "2025-07-10 12:30",
      klasse: "",
      aufsicht: "",
      location: "Holstenstraße 30, 22767",
      calendarId: "Frei"
    },
    {
      id: 19,
      title: "Schwimmtraining für Anfänger",
      start: "2025-07-11 10:00",
      end: "2025-07-11 11:30",
      klasse: "1c",
      aufsicht: "Fr. Becker",
      location: "Ifflandstraße 21, 22087",
      calendarId: "Sternipark"
    },
    {
      id: 20,
      title: "Wassergewöhnung - Gruppe A",
      start: "2025-07-11 13:00",
      end: "2025-07-11 14:30",
      klasse: "2a",
      aufsicht: "Hr. Wolf",
      location: "Hohe Weide 15, 20259",
      calendarId: "KitaWasserfreunde"
    },
    {
      id: 21,
      title: "Wassergewöhnung Gruppe B",
      start: "2025-07-08 09:00",
      end: "2025-07-08 10:30",
      klasse: "1d",
      aufsicht: "Fr. Müller",
      location: "Holstenstraße 30, 22767",
      calendarId: "KitaSonnenschein"
    },
    {
      id: 22,
      title: "Schwimmlernspiel",
      start: "2025-07-09 11:00",
      end: "2025-07-09 12:30",
      klasse: "2d",
      aufsicht: "Hr. Bauer",
      location: "Holstenstraße 30, 22767",
      calendarId: "KitaRegenbogen"
    },
    {
      id: 23,
      title: "Freies Spielen im Wasser",
      start: "2025-07-10 13:00",
      end: "2025-07-10 14:30",
      klasse: "3a",
      aufsicht: "Fr. Stein",
      location: "Holstenstraße 30, 22767",
      calendarId: "KitaAbenteuerland"
    },
    {
      id: 25,
      title: "Planschspaß für Anfänger",
      start: "2025-07-12 10:00",
      end: "2025-07-12 11:30",
      klasse: "1e",
      aufsicht: "Fr. Bergmann",
      location: "Holstenstraße 30, 22767",
      calendarId: "KitaRegenbogen"
    },
    {
      id: 27,
      title: "Schwimmlager Vorbereitung",
      start: "2025-07-07 13:00",
      end: "2025-07-07 14:30",
      klasse: "3d",
      aufsicht: "Fr. Kühn",
      location: "Möllner Landstraße 207, 22117",
      calendarId: "KitaElbkinder"
    }
  ])
  const user = ref({
    id: 1,
    name: "Natalya Yanitska",
    kita: "Sternipark",
    email: 'wilhelmstrasse@sternipark.de',
  })
  const notifications = ref([])

  function addNotification (event, type) {
    console.log("type: ", type)
    notifications.value.push({ ...event, person: user.value, type: type})
  }

  function markAsRead (event) {
    const index = notifications.value.findIndex(e => e.id === event.id && e.type === event.type)
    notifications.value.splice(index, 1)
  }

  function changeEventStatus (event, status) {
    const index = findIndex(event.id)
    events.value[index] = { ...events.value[index], title: status === 'Frei'? 'Frei' : 'Gebucht', aufsicht: "TBD", klasse: "TBD", calendarId: status }

    addNotification(events.value[index], status === 'Frei'? "published":"booked")
    console.log(events.value[index])
  }

  function findIndex(id){
    return events.value.findIndex(e => e.id === id)
  }

  function resetEvents () {
    events.value = [
      {
        id: 11,
        title: "Anfängerkurs Schwimmen",
        start: "2025-07-07 09:00",
        end: "2025-07-07 10:30",
        klasse: "1a",
        aufsicht: "Fr. Schneider",
        location: "Ifflandstraße 21, 22087",
        calendarId: "Sternipark"
      },
      {
        id: 12,
        title: "Wasserspiele für Kinder",
        start: "2025-07-07 11:00",
        end: "2025-07-07 12:30",
        klasse: "2b",
        aufsicht: "Hr. Krause",
        location: "Holstenstraße 30, 22767",
        calendarId: "KitaRegenbogen"
      },
      {
        id: 13,
        title: "Bronze-Abzeichen Vorbereitung",
        start: "2025-07-08 10:00",
        end: "2025-07-08 11:30",
        klasse: "3c",
        aufsicht: "Fr. Lange",
        location: "Elbgaustraße 110, 22523",
        calendarId: "KitaWasserfreunde"
      },
      {
        id: 14,
        title: "Spielzeit im Wasser",
        start: "2025-07-08 13:00",
        end: "2025-07-08 14:30",
        klasse: "1b",
        aufsicht: "Hr. Fröhlich",
        location: "Hohe Weide 15, 20259",
        calendarId: "Sternipark"
      },
      {
        id: 15,
        title: "Silber-Abzeichen Training",
        start: "2025-07-09 08:45",
        end: "2025-07-09 10:15",
        klasse: "4a",
        aufsicht: "Fr. König",
        location: "Basselweg 28, 22527",
        calendarId: "KitaLöwenzahn"
      },
      {
        id: 16,
        title: "Wassergewöhnung für Vorschulkinder",
        start: "2025-07-09 10:30",
        end: "2025-07-09 12:00",
        klasse: "2c",
        aufsicht: "Hr. Urban",
        location: "Budapester Straße 29, 20359",
        calendarId: "Sternipark"
      },
      {
        id: 17,
        title: "Schwimmkurs Fortgeschrittene",
        start: "2025-07-10 09:00",
        end: "2025-07-10 10:30",
        klasse: "3b",
        aufsicht: "Fr. Neumann",
        location: "Möllner Landstraße 207, 22117",
        calendarId: "KitaElbkinder"
      },
      {
        id: 18,
        title: "Freier Termin",
        start: "2025-07-10 11:00",
        end: "2025-07-10 12:30",
        klasse: "",
        aufsicht: "",
        location: "Holstenstraße 30, 22767",
        calendarId: "Frei"
      },
      {
        id: 19,
        title: "Schwimmtraining für Anfänger",
        start: "2025-07-11 10:00",
        end: "2025-07-11 11:30",
        klasse: "1c",
        aufsicht: "Fr. Becker",
        location: "Ifflandstraße 21, 22087",
        calendarId: "Sternipark"
      },
      {
        id: 20,
        title: "Wassergewöhnung - Gruppe A",
        start: "2025-07-11 13:00",
        end: "2025-07-11 14:30",
        klasse: "2a",
        aufsicht: "Hr. Wolf",
        location: "Hohe Weide 15, 20259",
        calendarId: "KitaWasserfreunde"
      }
    ]
  }
  return { events, user, notifications, changeEventStatus, resetEvents, markAsRead }
}, { persist: true }
)