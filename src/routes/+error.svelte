<script lang="ts">
    import { page } from '$app/state';
</script>

<h1>{page?.error?.message ?? 'An error occurred.'} - You can contact me at
    <a href="mailto:contact@quentinaslan.com" class="underline hover:text-blue-500 hover:text-2xl duration-900">contact@quentinaslan.com</a> ;)</h1>