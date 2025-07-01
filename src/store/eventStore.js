import { ref } from 'vue'

export const user = {
  id: 1,
  name: "Natalya Yanitska",
  kita: "Sternipark",
  email: 'wilhelmstrasse@sternipark.de',
}

export const calendarEvents = ref([
  {
    id: 1,
    title: "Schwimmkurs Anfänger",
    start: "2025-06-02 09:00",
    end: "2025-06-02 10:30",
    klasse: "1a",
    aufsicht: "Fr. Schneider",
    location: "Ifflandstraße 21, 22087",
    calendarId: "Sternipark"
  },
    {
      id: 2,
      title: "Wassergewöhnung",
      start: "2025-06-02 11:00",
      end: "2025-06-02 12:30",
      klasse: "2b",
      aufsicht: "Hr. Krause",
      location: "Holstenstraße 30, 22767",
      calendarId: "KitaRegenbogen"
    },
    {
      id: 3,
      title: "Bronze Abzeichen",
      start: "2025-06-03 10:00",
      end: "2025-06-03 11:30",
      klasse: "3c",
      aufsicht: "Fr. Lange",
      location: "Elbgaustraße 110, 22523",
      calendarId: "KitaWasserfreunde"
    },
    {
      id: 4,
      title: "Spiel & Spaß im Wasser",
      start: "2025-06-03 13:00",
      end: "2025-06-03 14:30",
      klasse: "1b",
      aufsicht: "Hr. Fröhlich",
      location: "Hohe Weide 15, 20259",
      calendarId: "Sternipark"
    },
    {
      id: 5,
      title: "Abzeichen-Training Silber",
      start: "2025-06-04 08:45",
      end: "2025-06-04 10:15",
      klasse: "4a",
      aufsicht: "Fr. König",
      location: "Basselweg 28, 22527",
      calendarId: "KitaLöwenzahn"
    },
    {
      id: 6,
      title: "Wassergewöhnung",
      start: "2025-06-04 10:30",
      end: "2025-06-04 12:00",
      klasse: "2c",
      aufsicht: "Hr. Urban",
      location: "Budapester Straße 29, 20359",
      calendarId: "Sternipark"
    },
    {
      id: 7,
      title: "Schwimmkurs Fortgeschrittene",
      start: "2025-06-05 09:00",
      end: "2025-06-05 10:30",
      klasse: "3b",
      aufsicht: "Fr. Neumann",
      location: "Möllner Landstraße 207, 22117",
      calendarId: "KitaElbkinder"
    },
    {
      id: 8,
      title: "Freier Termin",
      start: "2025-06-05 11:00",
      end: "2025-06-05 12:30",
      klasse: "",
      aufsicht: "",
      location: "Holstenstraße 30, 22767",
      calendarId: "Frei"
    },
    {
      id: 9,
      title: "Schwimmtraining",
      start: "2025-06-06 10:00",
      end: "2025-06-06 11:30",
      klasse: "1c",
      aufsicht: "Fr. Becker",
      location: "Ifflandstraße 21, 22087",
      calendarId: "Sternipark"
    },
    {
      id: 10,
      title: "Wassergewöhnung",
      start: "2025-06-06 13:00",
      end: "2025-06-06 14:30",
      klasse: "2a",
      aufsicht: "Hr. Wolf",
      location: "Hohe Weide 15, 20259",
      calendarId: "KitaWasserfreunde"
    }
  ]);

export const todoEvents = ref({
  id: 8
})
