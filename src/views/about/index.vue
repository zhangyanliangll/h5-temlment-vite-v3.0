<script setup lang="ts">
defineOptions({
  name: 'AboutPage',
})

const router = useRouter()
</script>

<template>
  <div @click="router.push('/')">About</div>
</template>

<style scoped></style>
