<script setup>
import FormInput from "../components/FormInput.vue"
import { useForm } from "vee-validate"
import * as yup from "yup"

const { handleSubmit, values, errors, defineInputBinds } = useForm({
  validationSchema: yup.object({
    firstName: yup.string().required("Your first name is required"),
    lastName: yup.string().required("Your last name is required"),
    email: yup.string().email().required(),
    password: yup.string().min(8).required("A password is required"),
  }),
})

const firstName = defineInputBinds("firstName")
const lastName = defineInputBinds("lastName")
const email = defineInputBinds("email")
const password = defineInputBinds("password")

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <main>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="first-name">First name</label>
        <FormInput
          v-bind="firstName"
          id="first-name"
          type="text"
          placeholder="John"
          autocomplete="off"
        />

        <span>{{ errors.firstName }}</span>
      </div>

      <div>
        <label for="last-name">Last name</label>
        <FormInput
          v-bind="lastName"
          id="last-name"
          type="text"
          placeholder="Doe"
          autocomplete="off"
        />

        <span>{{ errors.lastName }}</span>
      </div>

      <div>
        <label for="last-name">Email</label>
        <FormInput
          v-bind="email"
          id="email"
          type="text"
          placeholder="johndoe@gmail.com"
          autocomplete="off"
        />

        <span>{{ errors.email }}</span>
      </div>

      <div>
        <label for="last-name">Password</label>
        <FormInput
          v-bind="password"
          id="password"
          type="password"
          placeholder="*********"
          autocomplete="off"
        />

        <span>{{ errors.password }}</span>
      </div>

      <pre>values: {{ values }}</pre>

      <button type="submit" class="[ bg-red-100 ]">Login</button>
    </form>
  </main>
</template>

<style scoped></style>
