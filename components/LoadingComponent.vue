<script setup lang="ts">
    const {isLoading,className} = defineProps(['isLoading', 'className'])
</script>

<template>
    <i v-if="isLoading" :class="`mx-5 text-sm text-black/50 animate-spin pi pi-spinner ${className?className:''}`"></i>
</template>