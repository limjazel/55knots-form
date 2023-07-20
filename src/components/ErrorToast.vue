<script setup>
	import { onMounted } from "vue"

	const emit = defineEmits(["retry"])

	onMounted(() => {
		setTimeout(() => {
			emit("retry")
		}, 5000)
	})
</script>

<template>
	<div class="[ bg-slate-100 rounded shadow-lg px-6 py-3 ]">
		<slot />
	</div>
</template>
