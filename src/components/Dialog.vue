<script setup>
	import { onMounted } from "vue"
	import { toTitleCase } from "@/helpers/string"

	defineProps(["completedData", "isOpen"])
	const emit = defineEmits(["close"])

	onMounted(() => {
		window.addEventListener("keydown", (event) => {
			if (event.key === "Escape") {
				emit("close")
			}
		})
	})
</script>

<template>
	<div
		v-if="isOpen"
		@click.self="$emit('close')"
		class="c-dialog [ scrolling--stop ] [ flex items-center justify-center ]">
		<div class="c-dialog-body [ flex flex-col ]">
			<button
				type="button"
				@click.prevent="$emit('close')"
				class="[ bg-slate-300 inline-block rounded ] [ fixed top-6 right-6 ] [ px-4 py-2 ]">
				<span class="[ text-xl ]">&times;</span>
				<span class="[ sr-only ]">close dialog</span>
			</button>

			<h1 class="[ text-xl text-center font-semibold ]">
				Your registration is succesful!
			</h1>

			<dl class="[ grid gap-4 mt-8 px-2 ]">
				<div>
					<dt>First name</dt>
					<dd>{{ completedData.firstName }}</dd>
				</div>

				<div>
					<dt>Last name</dt>
					<dd>{{ completedData.lastName }}</dd>
				</div>

				<div>
					<dt>Email</dt>
					<dd>{{ completedData.email }}</dd>
				</div>

				<div>
					<dt>Password</dt>
					<dd>{{ completedData.password.replaceAll(/./g, "*") }}</dd>
				</div>

				<div v-if="completedData.country">
					<dt>Country</dt>
					<dd>{{ toTitleCase(completedData.country) }}</dd>
				</div>

				<div v-if="completedData.profession">
					<dt>Profession</dt>
					<dd>{{ completedData.profession }}</dd>
				</div>

				<div v-if="completedData.specialty">
					<dt>Specialty</dt>
					<dd>{{ completedData.specialty }}</dd>
				</div>
			</dl>

			<a href="/home"
				class="[ bg-accent text-white sm:text-sm text-center ] [ mt-8 px-3 py-2 rounded ]">
				Go to home page
			</a>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
	.c-dialog {
		@apply fixed inset-0 h-screen w-full bg-orange-100/50 backdrop-blur-sm z-50;
	}
	.c-dialog-body {
		@apply mx-6 px-10 py-12 bg-white rounded-lg shadow-lg w-full md:max-w-[32rem];
	}
	dt {
		@apply block text-sm font-medium mb-2 text-orange-700;
	}
</style>
