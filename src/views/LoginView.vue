<script setup>
	import { ref, onMounted } from "vue"
	import { useForm } from "vee-validate"
	import { toTitleCase } from "@/helpers/string"
	import axios from "axios"
	import * as yup from "yup"
	import FormInput from "@components/FormInput.vue"
	import Dialog from "@components/Dialog.vue"
	import config from "@/config.json"

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
			password: yup
				.string()
				.min(8, "The password is too short.")
				.required("A password is required."),
		}),
	})

	const firstName = defineInputBinds("firstName")
	const lastName = defineInputBinds("lastName")
	const email = defineInputBinds("email")
	const password = defineInputBinds("password")

	const onSubmit = handleSubmit((values) => {
		isOpen.value = true

		completedData.firstName = values.firstName
		completedData.lastName = values.lastName
		completedData.email = values.email
		completedData.password = values.password.replaceAll(/./g, "*")
		completedData.country = selectedCountry.value?.isoCountry
		completedData.profession = selectedProfession.value?.professionName
		completedData.specialty = selectedSpecialty.value?.specialtyName
	})

	let completedData = {}

	const settings = ref(config)

	const countries = ref([])
	const professions = ref([])
	const specialties = ref([])

	let selectedCountry = ref(null)
	let selectedProfession = ref(null)
	let selectedSpecialty = ref(null)

	let isOpen = ref(false)

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

	function closeDialog() {
		isOpen.value = false
	}
</script>

<template>
	<main
		class="[ min-h-screen py-20 px-6 ] [ flex flex-col items-center justify-center ]">
		<h1 class="page-title">Account Registration</h1>

		<Dialog
			:completedData="completedData"
			:isOpen="isOpen"
			@close="closeDialog" />

		<form
			@submit.prevent="onSubmit"
			class="registration-form [ grid grid-cols-2 gap-5 ]">
			<div class="[ col-span-2 md:col-span-1 ]">
				<label
					for="first-name"
					class="[ form-label ]"
					>First name</label
				>
				<FormInput
					v-bind="firstName"
					id="first-name"
					type="text"
					placeholder="John"
					autocomplete="off"
					:error="errors.firstName" />
			</div>

			<div class="[ col-span-2 md:col-span-1 ]">
				<label
					for="last-name"
					class="[ form-label ]"
					>Last name</label
				>
				<FormInput
					v-bind="lastName"
					id="last-name"
					type="text"
					placeholder="Doe"
					autocomplete="off"
					:error="errors.lastName" />
			</div>

			<div class="[ col-span-2 ]">
				<label
					for="email"
					class="[ form-label ]">
					Email
				</label>
				<FormInput
					v-bind="email"
					id="email"
					type="text"
					placeholder="johndoe@gmail.com"
					autocomplete="off"
					:error="errors.email" />
			</div>

			<div class="[ col-span-2 ]">
				<label
					for="password"
					class="[ form-label ]"
					>Password</label
				>
				<FormInput
					v-bind="password"
					id="password"
					type="password"
					placeholder="*********"
					:error="errors.password" />
			</div>

			<div
				v-if="settings.country"
				class="[ col-span-2 ]">
				<label
					for="country"
					class="[ form-label ]"
					>Country</label
				>

				<select
					v-model="selectedCountry"
					name="country"
					id="country"
					class="[ form-select ]">
					<option
						v-for="country in countries"
						:value="country">
						{{ toTitleCase(country.isoCountry) }}
					</option>
				</select>
			</div>

			<div
				v-if="settings.profession"
				class="[ col-span-2 ]">
				<label
					for="profession"
					class="[ form-label ]"
					>Profession</label
				>

				<select
					v-model="selectedProfession"
					name="profession"
					id="profession"
					@change="handleChange"
					class="[ form-select ]">
					<option
						v-for="profession in professions"
						:value="profession">
						{{ profession.professionName }}
					</option>
				</select>
			</div>

			<div
				v-if="settings.specialty"
				class="[ col-span-2 ]">
				<label
					for="specialty"
					class="[ form-label ]">
					Specialty
				</label>

				<select
					v-model="selectedSpecialty"
					name="specialty"
					id="specialty"
					:disabled="specialties.length === 0"
					:class="{ 'form-select--disabled': specialties.length === 0 }"
					class="[ form-select ]">
					<option
						v-for="specialty in specialties"
						:value="specialty">
						{{ specialty.specialtyName }}
					</option>
				</select>
			</div>

			<button
				type="submit"
				class="[ bg-accent text-white sm:text-sm ] [ mt-4 px-3 py-2 rounded ] [ col-span-2 ]">
				Register
			</button>
		</form>
	</main>
</template>

<style lang="postcss">
	.page-title {
		@apply text-2xl font-semibold;
	}
	.registration-form {
		@apply max-w-md px-6 py-8 mt-8;
	}
	.form-label {
		@apply block text-sm font-medium mb-2;
	}
	.form-select {
		@apply border border-slate-300 rounded px-2.5 py-1.5 sm:text-sm
           w-full cursor-pointer;
	}
	.form-select--disabled {
		@apply bg-slate-200 cursor-not-allowed;
	}
</style>
