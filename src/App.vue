<template>
  <van-nav-bar
    v-if="!isHideNavBar && navBarTitle"
    :title="navBarTitle"
    :left-text="isHideBack ? '' : '返回'"
    :left-arrow="!isHideBack"
    @click-left="navigateBack"
  />
  <router-view v-slot="{ Component }">
    <keep-alive :include="cachedViews">
      <component class="page-container" :is="Component" v-if="isRouterAlive" />
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

import UseNavigation from '@/hooks/user-navigate'

defineOptions({
  name: 'App',
})

const route = useRoute()

const navBarTitle = computed<string>(() => {
  return route?.meta.title || ''
})

const isHideNavBar = computed<boolean>(() => {
  return !!route?.meta?.isHideNavBar
})

const isHideBack = computed<boolean>(() => {
  return !!route?.meta?.isHideBack
})

const { navigateBack } = UseNavigation()

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
