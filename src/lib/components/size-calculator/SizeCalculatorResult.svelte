<script lang="ts">
    import Button from "$lib/components/Button.svelte";

    type Props = {
        sizes: Size[]
    }

    let { sizes = $bindable()}: Props = $props();

    // TODO: Discuss with nicolas if the API can return more than two size
    const numberSize = sizes.find(size => !isNaN(Number(size.label)));
    const letterSize = sizes.find(size => isNaN(Number(size.label)));



    function resetSizes () {
        sizes =  []
    }
</script>

<div class="flex flex-col gap-10 items-center justify-center">

    <span>Your size is</span>

    <div class="text-5xl">
        {#if numberSize}
            <span>{numberSize.label}</span>
        {/if}

        {#if letterSize}
            {#if numberSize}
                <span> or </span>
            {/if}
            <span>{letterSize.label}</span>
        {/if}

    </div>

    <Button onclick={resetSizes}>
        OK
    </Button>

</div>