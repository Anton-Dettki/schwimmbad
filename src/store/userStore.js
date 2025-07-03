import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useUserStore = defineStore('userStore', () => {
    const sterni = {
        id: 1,
        name: "Natalya Yanitska",
        kita: "Sternipark",
        email: 'wilhelmstrasse@sternipark.de',
        calendars: [
            "Frei",
            "KitaElbkinder",
            "KitaRegenbogen",
            "KitaWasserfreunde",
            "Sternipark"
        ],
        isIns: false
    }

    const eltern ={
        id: 2,
        name: "Eltern 1",
        kita: "KitaElbkinder",
        email: 'wilhelmstrasse@sternipark.de',
        calendars: [
            "KitaElbkinder",
        ],
        isIns: false
    }

    const schwimmHolst = {
        id: 3,
        name: "Schwimmbad Holstenstraße",
        kita: "",
        email: 'holstenstraße@schwimmbad.de',
        calendars: [
            "Frei",
            "KitaElbkinder",
            "KitaRegenbogen",
            "KitaWasserfreunde",
            "Sternipark"
        ],
        location: "Holstenstraße 30, 22767",
        isIns: true
    }

    const currentUser = ref(sterni)

    function switchUser(user) {
        if(user === 'Sternipark') {
            currentUser.value = sterni
        } else if (user === 'Schwimmbad Holstenstraße') {
            currentUser.value = schwimmHolst
        } else if (user === 'Eltern') {
            currentUser.value = eltern
        }
    }

    return { currentUser, switchUser }
})