<script setup>
const $emit = defineEmits(["update:modelValue", "blur"])

defineProps({
  modelValue: String,
  error: false || Boolean,
})
</script>

<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
    :class="{ ['input-error']: error }"
    class="c-form-input [ border rounded px-3 py-2 ]"
  />
</template>

<style lang="postcss">
.input-error {
  @apply ring-2 ring-offset-1 ring-red-500;
}
</style>