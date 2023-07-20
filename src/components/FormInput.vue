<script setup>
import FormInputErrorMessage from "./FormInputErrorMessage.vue"

const props = defineProps({
  modelValue: String,
  error: String,
})

defineEmits(["update:modelValue", "blur"])
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="[ flex flex-col ]">
    <input
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      :class="{ ['input-error']: error !== undefined }"
      class="c-form-input [ form-input ]"
    />

    <FormInputErrorMessage class="mt-2">
      {{ error }}
    </FormInputErrorMessage>
  </div>
</template>

<style lang="postcss">
.c-form-input {
  @apply flex border border-slate-300 rounded px-2.5 py-1.5 sm:text-sm;
}

.input-error {
  @apply ring-2 ring-offset-1 ring-red-500;
}
</style>
