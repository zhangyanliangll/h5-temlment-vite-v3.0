<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cachedViews">
      <component :is="Component" v-if="isRouterAlive" />
    </keep-alive>
  </router-view>
  <van-loading
    v-show="loading"
    class="app-loading"
    type="spinner"
    color="#1989fa"
  />
</template>

<script setup lang="ts">
import { useCacheStore } from '@/stores/cache'
import { usePermissionsStore } from '@/stores/permissions'

defineOptions({
  name: 'App',
})
const permissionsStore = usePermissionsStore()

const isRouterAlive = ref(true)

provide('reload', reload)

async function reload() {
  isRouterAlive.value = false
  await nextTick()
  isRouterAlive.value = true
}

const loading = ref(false)

provide('loading', loading)

const cacheStore = useCacheStore()

const cachedViews = computed(() => cacheStore.cachedViews)

onBeforeMount(async () => {
  await permissionsStore.getAuth()
})
</script>
