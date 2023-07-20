<script setup>
import FormInputErrorMessage from "./FormInputErrorMessage.vue"

const $emit = defineEmits(["update:modelValue", "blur"])

const props = defineProps({
  modelValue: String,
  error: String,
})
</script>

<template>
  <div class="flex flex-col">
    <input
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      :class="{ ['input-error']: error !== undefined }"
      class="c-form-input"
    />

    <FormInputErrorMessage>
      {{ error }}
    </FormInputErrorMessage>
  </div>
</template>

<style lang="postcss">
.c-form-input {
  @apply flex border rounded px-3 py-2;
}

.input-error {
  @apply ring-2 ring-offset-1 ring-red-500;
}
</style>
