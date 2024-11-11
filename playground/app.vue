<script setup lang="ts">
</script>

<template>
	<div>Healthcheck playground!</div>
	<div style="display: flex; gap: 1rem">
		<a href="/readyz?verbose">/readyz</a>
		<a href="/livez?verbose">/livez</a>
	</div>
</template>
