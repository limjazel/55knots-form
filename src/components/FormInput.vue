<script setup>
const $emit = defineEmits(["update:modelValue", "blur"])

const props = defineProps({
  error: false || Boolean,
})

console.log(props)
</script>

<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
    :class="{ ['input-error']: props.error }"
    class="c-form-input [ border rounded px-3 py-2 ]"
  />
</template>

<style>
.input-error {
  background-color: red;
}
</style>