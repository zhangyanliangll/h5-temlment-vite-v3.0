<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cachedViews">
      <component :is="Component" v-if="isRouterAlive" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { useCacheStore } from '@/stores/cache'

defineOptions({
  name: 'App',
})

const isRouterAlive = ref(true)

provide('reload', reload)

async function reload() {
  isRouterAlive.value = false
  await nextTick()
  isRouterAlive.value = true
}

const cacheStore = useCacheStore()

const cachedViews = computed(() => cacheStore.cachedViews)
</script>

<style lang="scss" scoped></style>
