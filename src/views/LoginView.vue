<script setup>
	import { ref, onMounted } from "vue"
	import { useForm } from "vee-validate"
	import { toTitleCase } from "@/helpers/string"
	import axios from "axios"
	import * as yup from "yup"
	import config from "@/config.json"
	import FormInput from "@components/FormInput.vue"
	import Dialog from "@components/Dialog.vue"
	import Spinner from "@components/Spinner.vue"
	import ErrorToast from "@components/ErrorToast.vue"

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

	let completedData = {}

	const settings = ref(config)

	const countries = ref([])
	const professions = ref([])
	const specialties = ref([])

	let selectedCountry = ref(null)
	let selectedProfession = ref(null)
	let selectedSpecialty = ref(null)

	let isOpen = ref(false)
	let isFetchingSpecialties = ref(false)
	let isProcessing = ref(false)
	let apiErrors = ref({
		countries: false,
		professions: false,
		specialties: false,
	})

	onMounted(() => {
		if (config.country) {
			fetchCountries()
		}

		if (config.profession) {
			fetchProfessions()
		}

		if (!config.profession && config.specialty) {
			fetchSpecialties()
		}
	})

	let onSubmit = handleSubmit((values) => {
		isProcessing.value = true

		completedData.firstName = values.firstName
		completedData.lastName = values.lastName
		completedData.email = values.email
		completedData.password = values.password.replaceAll(/./g, "*")
		completedData.country = selectedCountry.value?.isoCountry
		completedData.profession = selectedProfession.value?.professionName
		completedData.specialty = selectedSpecialty.value?.specialtyName

		setTimeout(() => {
			isOpen.value = true
			isProcessing.value = false
		}, 3000)
	})

	function fetchCountries() {
		apiErrors.value.countries = false

		axios
			.get("http://localhost:3000/api/countries")
			.then((response) => {
				countries.value = response.data
			})
			.catch(() => {
				apiErrors.value.countries = true
			})
	}

	function fetchProfessions() {
		apiErrors.value.professions = false

		axios
			.get("http://localhost:3000/api/professions")
			.then((response) => {
				professions.value = response.data
			})
			.catch(() => {
				apiErrors.value.professions = true
			})
	}

	function fetchSpecialties() {
		apiErrors.value.specialties = false

		axios
			.get(`http://localhost:3000/api/specialties`)
			.then((response) => {
				specialties.value = response.data
			})
			.catch(() => {
				apiErrors.value.specialties = true
			})
	}

	function handleChange() {
		selectedSpecialty.value = null
		isFetchingSpecialties.value = true

		if (!config.specialty) {
			return
		}

		axios
			.get(
				`http://localhost:3000/api/specialties?profession=${selectedProfession.value.professionId}`,
			)
			.then((response) => {
				specialties.value = response.data
				isFetchingSpecialties.value = false
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

		<div class="[ grid gap-4 ] [ absolute right-4 bottom-4 ]">
			<ErrorToast
				v-if="apiErrors.countries"
				@retry="fetchCountries">
				countries error
			</ErrorToast>

			<ErrorToast
				v-if="apiErrors.professions"
				@retry="fetchProfessions">
				professions error
			</ErrorToast>

			<ErrorToast @retry="fetchSpecialties"> specialties error </ErrorToast>
		</div>

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
					class="[ form-label ]">
					Country
				</label>

				<select
					v-model="selectedCountry"
					name="country"
					id="country"
					:class="{ 'text-slate-400': selectedCountry === null }"
					class="[ form-select ]">
					<option :value="null">Select country</option>

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
					class="[ form-label ]">
					Profession
				</label>

				<select
					v-model="selectedProfession"
					name="profession"
					id="profession"
					@change="handleChange"
					:class="{ 'text-slate-400': selectedProfession === null }"
					class="[ form-select ]">
					<option :value="null">Select profession</option>

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

				<div class="[ relative ]">
					<div
						v-if="isFetchingSpecialties"
						class="[ absolute left-2 top-1/2 -translate-y-1/2 z-10 ]">
						<Spinner class="h-4 w-4 text-orange-700" />
					</div>
					<select
						v-model="selectedSpecialty"
						name="specialty"
						id="specialty"
						:disabled="specialties.length === 0"
						:class="{
							'form-select--disabled': specialties.length === 0,
							'text-slate-400': selectedSpecialty === null,
						}"
						class="[ form-select ]">
						<option :value="null">Select specialty</option>

						<option
							v-for="specialty in specialties"
							:value="specialty">
							{{ specialty.specialtyName }}
						</option>
					</select>
				</div>
			</div>

			<button
				type="submit"
				:disabled="
					apiErrors.countries || apiErrors.professions || apiErrors.specialties
				"
				:class="{
					'opacity-70':
						apiErrors.countries ||
						apiErrors.professions ||
						apiErrors.specialties,
				}"
				class="submit-button [ col-span-2 ] [ flex justify-center items-center gap-2 ]">
				<Spinner
					v-if="isProcessing"
					class="h-4 w-4 text-white" />
				<span>Register</span>
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
	.submit-button {
		@apply bg-accent text-white sm:text-sm mt-4 px-3 py-2 rounded;
	}
</style>
