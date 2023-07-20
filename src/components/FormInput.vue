<script setup>
const $emit = defineEmits(["update:modelValue", "blur"])

const props = defineProps({
  modelValue: String,
  error: String,
})

console.error(props)
</script>

<template>
  <input
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
    :class="{ ['input-error']: error !== undefined }"
    class="c-form-input [ border rounded px-3 py-2 ]"
  />
</template>

<style lang="postcss">
.input-error {
  @apply ring-2 ring-offset-1 ring-red-500;
}
</style>