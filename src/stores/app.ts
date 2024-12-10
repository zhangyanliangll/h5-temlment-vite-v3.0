export const useAppStore = defineStore(
  'app',
  () => {
    return {}
  },
  {
    persist: {
      storage: localStorage,
      pick: [],
    },
  },
)
