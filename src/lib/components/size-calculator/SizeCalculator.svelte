<script lang="ts">
    import SizeCalculatorHeader from "$lib/components/size-calculator/SizeCalculatorHeader.svelte";
    import SizeCalculatorForm from "$lib/components/size-calculator/SizeCalculatorForm.svelte";
    import type {Size} from "$lib/types/size";
    import SizeCalculatorResult from "$lib/components/size-calculator/SizeCalculatorResult.svelte";

    let sizes = $state<Size[]>([])

</script>
<div class="font-manrope max-w-sm min-w-sm bg-global-gray rounded-2xl shadow border border-gray-400">
    <!-- Header -->
    <SizeCalculatorHeader />

    <div class="p-6">
        {#if sizes.length > 0}
            <SizeCalculatorResult bind:sizes={sizes} />
        {:else}
            <SizeCalculatorForm sizeReady={(_sizes) => sizes = _sizes} />
        {/if}
    </div>

</div>
