<script setup>
const $emit = defineEmits(["update:modelValue", "blur"])

const props = defineProps({
  id: String,
  type: String,
  autocomplete: String,
  placeholder: String,
  modelValue: String,
})

console.log(props)
</script>

<template>
  <input
    :id="props.id"
    :type="props.type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
    :autocomplete="props.autocomplete"
    :placeholder="props.placeholder"
    class="c-form-input [ border rounded px-3 py-2 ]"
  />
</template>
