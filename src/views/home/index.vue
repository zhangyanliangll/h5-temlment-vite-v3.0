<script setup lang="ts">
defineOptions({
  name: 'HomePage',
})

const loading = inject('loading', ref(false))

onBeforeMount(() => {
  setTimeout(() => {
    loading.value = true
  }, 2000)
})
</script>

<template>
  <div class="flex home">首页 {{ loading }}</div>
</template>

<style scoped lang="scss">
.home {
  font-size: 25px;
  @include text-line();
  background-color: $bg-color-mask;
}
</style>
