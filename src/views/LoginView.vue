<script setup>
	import { ref, onMounted } from "vue"
	import FormInput from "../components/FormInput.vue"
	import { useForm } from "vee-validate"
	import * as yup from "yup"
	import config from "../config.json"
	import axios from "axios"

	const { handleSubmit, values, errors, defineInputBinds } = useForm({
		initialValues: {
			firstName: "Jillian",
			lastName: "Lim",
			email: "test@example.com",
			password: "p@$$w0rd",
		},
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
		isOpen.value = true
	})

	const settings = ref(config)

	const countries = ref([])
	const professions = ref([])
	const specialties = ref([])

	let selectedCountry = ref(null)
	let selectedProfession = ref(null)
	let selectedSpecialty = ref(null)

	onMounted(() => {
		if (config.country) {
			axios.get("http://localhost:3000/api/countries").then((response) => {
				countries.value = response.data
			})
		}

		if (config.profession) {
			axios.get("http://localhost:3000/api/professions").then((response) => {
				professions.value = response.data
			})
		}
	})

	function handleChange() {
		selectedSpecialty.value = null

		if (!config.specialty) {
			return
		}

		axios
			.get(
				`http://localhost:3000/api/specialties?profession=${selectedProfession.value.professionId}`,
			)
			.then((response) => {
				specialties.value = response.data
			})
	}

	let isOpen = ref(false)
</script>

<template>
	<main>
		<div
			class="bg-red-100 flex flex-col"
			v-if="isOpen">
			<button
				type="button"
				@click.prevent="() => (isOpen = false)"
				class="bg-red-600">
				close dialog
			</button>

			<dl>
				<div>
					<dt>First name</dt>
					<dd>{{ values.firstName }}</dd>
				</div>

				<div>
					<dt>Last name</dt>
					<dd>{{ values.lastName }}</dd>
				</div>

				<div>
					<dt>Email</dt>
					<dd>{{ values.email }}</dd>
				</div>

				<div>
					<dt>Password</dt>
					<dd>{{ values.password.replaceAll(/./g, "*") }}</dd>
				</div>

				<div v-if="selectedCountry !== null">
					<dt>Country</dt>
					<dd>{{ selectedCountry.isoCountry }}</dd>
				</div>

				<div v-if="selectedProfession !== null">
					<dt>Profession</dt>
					<dd>{{ selectedProfession.professionName }}</dd>
				</div>

				<div v-if="selectedSpecialty !== null">
					<dt>Specialty</dt>
					<dd>{{ selectedSpecialty.specialtyName }}</dd>
				</div>
			</dl>
		</div>

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

				<select
					v-model="selectedSpecialty"
					name="specialty"
					id="specialty"
					:disabled="specialties.length === 0"
					class="[ w-full px-4 py-2 ]">
					<option
						v-for="specialty in specialties"
						:value="specialty">
						{{ specialty.specialtyName }}
					</option>
				</select>
			</div>


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
