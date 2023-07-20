<script setup>
	import { onMounted, ref } from "vue"

	let user = ref(null)

	onMounted(() => {
		if (localStorage.getItem("completedData")) {
			user.value = JSON.parse(localStorage.getItem("completedData"))
		}
	})
</script>

<template>
	<main class="[ min-h-screen ] [ flex items-center justify-center ]">
		<div
			v-if="user"
			class="[ flex flex-col items-center ]">
			<h1 class="[ text-3xl font-semibold ]">
				&#128075; Hello {{ user.firstName + " " + user.lastName }}!
			</h1>
			<span>{{ user.email }}</span>
			<span>Welcome to your dashboard</span>

			<div class="[ border-t mt-6 w-full text-center ]">
				<a
					href="/"
					class="[ text-accent font-semibold pt-6 block ]">
					Register another account
				</a>
			</div>
		</div>

		<div
			v-else
			class="[ flex flex-col items-center ]">
			<h1 class="[ text-3xl font-semibold ]">You aren't registered yet.</h1>
			<p class="[ mt-2 ]">
				It seems like you aren't registered yet.
				<a
					href="/"
					class="[ text-accent font-semibold ]">
					Click here
				</a>
				to sign up.
			</p>
		</div>
	</main>
</template>
