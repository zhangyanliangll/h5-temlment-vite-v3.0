export default function useKeyboardVisibility() {
  const isKeyboardVisible = ref(false)

  const onFocus = () => {
    isKeyboardVisible.value = true
  }

  const onBlur = () => {
    isKeyboardVisible.value = false
  }

  onMounted(() => {
    window.addEventListener('focusin', onFocus)
    window.addEventListener('focusout', onBlur)
  })

  onUnmounted(() => {
    window.removeEventListener('focusin', onFocus)
    window.removeEventListener('focusout', onBlur)
  })

  return { isKeyboardVisible }
}
