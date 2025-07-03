<template>
  <v-container
      class="fill-height d-flex justify-center align-center"
      fluid
  >
    <v-card variant="text" min-width="700" class="pb-5">
      <v-row justify="center" align="center" class="pa-5">
        <v-col
            cols="12"
            sm="4"
            v-for="user in users"
            :key="user.name"
            class="d-flex flex-column align-center text-center"
        >
          <v-avatar
              :image="user.img"
              size="100"
              class="mb-2 cursor-pointer"
              @click="switchUser(user)"
          />
          <h3 class="mt-1">{{ user.name }}</h3>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import sterni from '@/assets/user/admin/adminAvatar.png'
import eltern from '@/assets/eltern.png'
import schwimm from '@/assets/schwimm.png'
import { useUserStore } from '@/store/userStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const users = [{ name:'Sternipark', img: sterni }, { name: 'Schwimmbad Holstenstraße', img: schwimm }, { name: 'Eltern', img: eltern }]

function switchUser (u) {
  userStore.switchUser(u)
  router.push('/')
}

</script>

<style scoped>

</style>