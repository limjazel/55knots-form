<script setup>
	import { ref } from "vue"
	import FormInput from "../components/FormInput.vue"
	import { useForm } from "vee-validate"
	import * as yup from "yup"
	import config from "../config.json"
	import axios from "axios"

	const { handleSubmit, values, errors, defineInputBinds } = useForm({
		validationSchema: yup.object({
			firstName: yup.string().required("Your first name is required."),
			lastName: yup.string().required("Your last name is required."),
			email: yup
				.string()
				.email("The email address you provided is not valid.")
				.required("An email address is required."),
			password: yup.string().min(8).required("A password is required."),
		}),
	})

	const firstName = defineInputBinds("firstName")
	const lastName = defineInputBinds("lastName")
	const email = defineInputBinds("email")
	const password = defineInputBinds("password")

	const onSubmit = handleSubmit((values) => {
		alert(JSON.stringify(values, null, 2))
	})

	const settings = ref(config)
	console.error(settings.value)

	const countries = ref([])
	const professions = ref([])
	const specialties = ref([])

	let selectedCountry = ref(null)
	let selectedProfession = ref(null)
	let selectedSpecialty = ref(null)

	axios.get("http://localhost:3000/api/countries").then((response) => {
		countries.value = response.data
	})

	axios.get("http://localhost:3000/api/professions").then((response) => {
		professions.value = response.data
	})

	function handleChange() {
		axios
			.get(
				`http://localhost:3000/api/professions/${selectedProfession.value.professionId}/specialties`,
			)
			.then((response) => {
				specialties.value = response.data
			})
	}
</script>

<template>
	<main>
		{{ config }}

		<form
			@submit.prevent="onSubmit"
			class="registration-form [ grid grid-cols-2 gap-4 ]">
			<div>
				<label for="first-name">First name</label>
				<FormInput
					v-bind="firstName"
					id="first-name"
					type="text"
					placeholder="John"
					autocomplete="off"
					:error="errors.firstName" />
			</div>

			<div>
				<label for="last-name">Last name</label>
				<FormInput
					v-bind="lastName"
					id="last-name"
					type="text"
					placeholder="Doe"
					autocomplete="off"
					:error="errors.lastName" />
			</div>

			<div>
				<label for="last-name">Email</label>
				<FormInput
					v-bind="email"
					id="email"
					type="text"
					placeholder="johndoe@gmail.com"
					autocomplete="off"
					:error="errors.email" />
			</div>

			<div>
				<label for="password">Password</label>
				<FormInput
					v-bind="password"
					id="password"
					type="password"
					placeholder="*********"
					:error="errors.password" />
			</div>

			<div v-if="settings.country">
				<label for="country">Country</label>

				{{ selectedCountry }}
				<select
					v-model="selectedCountry"
					name="country"
					id="country"
					class="[ w-full px-4 py-2 ]">
					<option
						v-for="country in countries"
						:value="country">
						{{ country.isoCountry }}
					</option>
				</select>
			</div>

			<div v-if="settings.profession">
				<label for="profession">Profession</label>

				{{ selectedProfession }}
				<select
					v-model="selectedProfession"
					name="profession"
					id="profession"
					@change="handleChange"
					class="[ w-full px-4 py-2 ]">
					<option
						v-for="profession in professions"
						:value="profession">
						{{ profession.professionName }}
					</option>
				</select>
			</div>

			<div v-if="settings.specialty">
				<label for="specialty">Specialty</label>

				{{ selectedSpecialty }}
				<select
					v-model="selectedSpecialty"
					name="specialty"
					id="specialty"
					:disabled="selectedProfession === null"
					class="[ w-full px-4 py-2 ]">
					<option v-for="specialty in specialties">
						{{ specialty.specialtyName }}
					</option>
				</select>
			</div>

			<pre>values: {{ values }}</pre>

			<button
				type="submit"
				class="block bg-slate-500 py-2 px-4 border">
				Login
			</button>
		</form>
	</main>
</template>

<style lang="postcss">
	.registration-form {
		@apply max-w-md bg-yellow-100 px-6 py-8 mx-auto;
	}
</style>
