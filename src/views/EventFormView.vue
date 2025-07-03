<script setup>
import { ref, watch } from 'vue'
import { useEventStore } from '@/store/eventStore.js'

// Props or you can replace with your selected event id logic
const props = defineProps({
  eventId: {
    type: Number,
    required: true
  }
})

const eventStore = useEventStore()

// Find the event by id from the store
const event = ref(null)

watch(() => props.eventId, (id) => {
  const e = eventStore.events.find(ev => ev.id === id)
  if (e) {
    event.value = { ...e } // create a local copy to edit
  }
}, { immediate: true })

// Local editable refs
const title = ref('')
const klasse = ref('')
const aufsicht = ref('')

// Sync event data to local refs
watch(event, (val) => {
  if (val) {
    title.value = val.title
    klasse.value = val.klasse
    aufsicht.value = val.aufsicht
  }
})

// Save changes back to store
function save() {
  if (!event.value) return
  eventStore.updateEvent({
    ...event.value,
    title: title.value,
    klasse: klasse.value,
    aufsicht: aufsicht.value,
  })
}
</script>

<template>
  <v-card class="pa-5" max-width="600">
    <v-form>
      <v-text-field
          v-model="title"
          label="Title"
          required
      />
      <v-text-field
          v-model="klasse"
          label="Klasse"
          required
      />
      <v-text-field
          v-model="aufsicht"
          label="Aufsicht"
          required
      />

      <v-btn class="mt-4" color="primary" @click="save">
        Save
      </v-btn>
    </v-form>
  </v-card>
</template>
