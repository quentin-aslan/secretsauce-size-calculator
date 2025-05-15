<script lang="ts">
    import dropdown from "$lib/images/dropdown.svg";

    type Props = {
        data: {
            name: string;
            id: string;
        }[],
        placeholder?: string;
    }

    let props: Props = $props();


    let input = $state('');
    let selected: string | null = $state(null); // TODO: Emit to the parent component. -> I saw "debrief" in the documentation.
    let showSuggestions = $state(false);

    const filtered = $derived.by(() => {
        const value = input;
        const source = props.data;

        return value
            ? source.filter(b => b.name.toLowerCase().includes(value.toLowerCase()) && b.name.toLowerCase() !== value.toLowerCase())
            : source;
    });
</script>

<div class="relative w-full">
    <input
        type="text"
        bind:value={input}
        oninput={() => (showSuggestions = true)}
        onfocus={() => (showSuggestions = true)}
        onblur={() => setTimeout(() => showSuggestions = false, 150)}
        placeholder={props.placeholder}
        class="w-full p-2 bg-white text-gray-700 border-b-2 border-secondary focus:outline-none focus:border-secondary/80 placeholder:font-light"
    />

    <img src="{dropdown}" alt="Logo dropdown" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />


    {#if showSuggestions && filtered.length > 0}
        <ul class="absolute z-10 w-full bg-white border border-gray-200 text-black shadow-md max-h-60 overflow-y-auto">
            {#each filtered as brand, i (i)}
                <li>
                    <button
                            class="w-full text-left px-4 py-2 cursor-pointer hover:bg-primary"
                        aria-label={brand.name}
                        onclick={() => {
                            input = brand.name;
                            selected = brand.id;
                            showSuggestions = false;
                        }}
                    >
                        {brand.name}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>
