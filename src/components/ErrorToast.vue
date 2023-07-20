<script setup>
	import { onMounted } from "vue"
	import WarningIcon from "./icons/WarningIcon.vue"

	const emit = defineEmits(["retry"])

	onMounted(() => {
		setTimeout(() => {
			emit("retry")
		}, 5000)
	})
</script>

<template>
	<div class="[ bg-white rounded shadow-lg ring-1 ring-black/5 px-6 py-4 ] [ text-sm ] [ flex gap-4 ] [ max-w-[22rem] md:max-w-[26rem] ]">
		<WarningIcon class="[ text-yellow-500 shrink-0 mt-1 ]" />
		<slot />
	</div>
</template>
