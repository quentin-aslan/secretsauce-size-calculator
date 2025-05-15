<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="min-h-screen bg-gray-50 text-gray-900 px-4 py-6 mx-auto">
	{@render children()}
</main>