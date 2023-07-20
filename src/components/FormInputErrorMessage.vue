<template>
  <span class="c-input-error-message">
    <slot/>
  </span>
</template>

<style lang="postcss">
  .c-input-error-message {
    @apply text-xs text-red-600;
  }
</style>