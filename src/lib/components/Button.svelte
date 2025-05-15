<script lang="ts">
    let { children, ...others } = $props();
</script>

<button
    {...others}
    class="mx-auto min-w-[150px] p-4 bg-secondary hover:bg-secondary/80 text-gray-800 rounded-2xl shadow-md shadow-black/25 cursor-pointer disabled:bg-secondary/50 disabled:cursor-not-allowed"
>
    {@render children()}
</button>