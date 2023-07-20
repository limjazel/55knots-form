<script setup>
const $emit = defineEmits(["update:modelValue", "blur"])

const props = defineProps({
  id: String,
  type: String,
  autocomplete: String,
  placeholder: String,
  modelValue: String,
  error: Boolean,
})

console.log(props)
</script>

<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
    :class="{ 'red': props.error }"
    class="c-form-input [ border rounded px-3 py-2 ]"
  />
</template>

<style>
.red {
  background-color: red;
}
</style>