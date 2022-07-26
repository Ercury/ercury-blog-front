import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebar', {
    state() {
        return {
            collapse: false
        }
    },

    getters: {

    },

    actions: {
        handlecollapse() {
            this.collapse = !this.collapse;
        }
    }
})