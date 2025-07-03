import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useUserStore = defineStore('userStore', () => {
    const Frei = {
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
        }
    }
    const KitaElbkinder = {
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
        }
    }
    const KitaRegenbogen = {
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
        }
    }
    const KitaWasserfreunde = {
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
        }
    }
    const Sternipark = {
        label: 'Sternipark',
        colorName: 'Sternipark',
        lightColors: {
            main: '#6333d5',         // dark teal
            container: '#dad1f6',    // soft teal for background contrast
            onContainer: '#001F25',  // nearly black for clear text
        }
    }

    const sterni = ref({
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
    })

    const eltern = ref({
        id: 2,
        name: "Eltern 1",
        kita: "KitaElbkinder",
        email: 'wilhelmstrasse@sternipark.de',
        calendars: [
            "KitaElbkinder",
        ],
        isIns: false
    })

    const schwimmHolst = ref({
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
    })

    const currentUser = ref(sterni)

    function switchUser(user) {
        if(user === 'Sternipark') {
            currentUser.value = sterni.value
        } else if (user === 'Schwimmbad Holstenstraße') {
            currentUser.value = schwimmHolst.value
        } else if (user === 'Eltern') {
            currentUser.value = eltern.value
        }
    }

    return { currentUser, switchUser }
})