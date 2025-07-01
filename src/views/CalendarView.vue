<template>
  <v-row class="justify-center">
    <v-col cols="9">
      <v-progress-linear v-if="busy" indeterminate />
      <Calendar />
    </v-col>
  </v-row>
  <v-dialog v-model="showEventInfoDialog" max-width="800">
    <v-card variant="outlined" :title="clickedEvent.title"> Test </v-card>
  </v-dialog>
</template>

<script setup>
import Calendar from '@/components/Calendar.vue'

</script>

<style scoped></style>
