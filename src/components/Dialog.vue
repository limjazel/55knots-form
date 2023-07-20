<script setup>
	defineProps(["completedData", "isOpen"])
	defineEmits(["close"])
</script>

<template>
	<div
		class="bg-red-100 flex flex-col"
		v-if="isOpen">
		<button
			type="button"
			@click.prevent="$emit('close')"
			class="bg-red-600">
			close dialog
		</button>

		<dl>
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
				<dd>{{ completedData.country }}</dd>
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
	</div>
</template>

<style lang="postcss"></style>
