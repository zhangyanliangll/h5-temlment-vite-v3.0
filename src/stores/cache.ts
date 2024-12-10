export const useCacheStore = defineStore('cache', () => {
  const cachedViews = ref(new Set<string>())

  const addView = (view: string) => {
    cachedViews.value.add(view)
  }

  const removeView = (view: string) => {
    cachedViews.value.delete(view)
  }

  const clearView = () => {
    cachedViews.value.clear()
  }

  return {
    cachedViews: computed(() => Array.from(cachedViews.value)),
    addView,
    removeView,
    clearView,
  }
})
