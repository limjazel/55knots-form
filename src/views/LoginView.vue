<script setup>
import FormInput from "../components/FormInput.vue"
import { useForm } from "vee-validate"
import * as yup from "yup"

const { values, errors, defineInputBinds } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
  }),
})

const email = defineInputBinds("email", {
  validateOnValueUpdate: false,
})

function handleSubmit() {
  console.error("submit!")
}
</script>

<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <label for="first-name">First name</label>
      <FormInput
        v-bind="email"
        id="first-name"
        type="text"
        placeholder="John"
        autocomplete="off"
        class="border"
      />

      <span>{{ errors.email }}</span>

      <pre>values: {{ values }}</pre>

      <button type="submit" class="[ bg-red-100 ]">Login</button>
    </form>
  </main>
</template>

<style scoped></style>
