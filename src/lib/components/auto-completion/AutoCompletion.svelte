<script lang="ts">
    import dropdown from "$lib/images/dropdown.svg";

    type Props = {
        data: {
            name: string;
            id: string;
        }[],
        placeholder?: string;
        disabled?: boolean;
        selected: string | null;
    }

    let { selected = $bindable(), ...props}: Props = $props();

    let input = $state(props.data.find(b => b.id === selected)?.name || '');
    let showSuggestions = $state(false);
    let highlightedIndex = $state(-1);

    let suggestionsContainer = $state<HTMLUListElement | null>(null)
    let highlightedItem = $state<HTMLButtonElement | null>(null);

    // Scroll the highlighted item into view when the suggestion container is updated (if the user navigates with the keyboard)
    $effect(() => {
        highlightedItem = document.querySelector(`#${filtered[highlightedIndex]?.id}`);
        scrollHighlightedIntoView();
    }) // $effect = useEffect en react.

    // Function to scroll the highlighted item into view (if the user navigates with the keyboard)
    function scrollHighlightedIntoView() {
        if (highlightedItem && suggestionsContainer) {
            // Get the position of the highlighted item relative to the container
            const containerRect = suggestionsContainer.getBoundingClientRect();
            const itemRect = highlightedItem.getBoundingClientRect();

            // Check if the item is outside the visible area of the container
            if (itemRect.bottom > containerRect.bottom) { // Scroll donw
                suggestionsContainer.scrollTop += (itemRect.bottom - containerRect.bottom);
            } else if (itemRect.top < containerRect.top) { // Scroll up
                suggestionsContainer.scrollTop -= (containerRect.top - itemRect.top);
            }
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!showSuggestions || filtered.length === 0) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                highlightedIndex = (highlightedIndex + 1) % filtered.length;
                // Wait for the DOM to update before scrolling
                setTimeout(scrollHighlightedIntoView, 0);
                break;
            case 'ArrowUp':
                event.preventDefault();
                highlightedIndex = (highlightedIndex - 1 + filtered.length) % filtered.length;
                // Wait for the DOM to update before scrolling
                setTimeout(scrollHighlightedIntoView, 0);
                break;
            case 'Enter':
                if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
                    event.preventDefault();
                    const selectedBrand = filtered[highlightedIndex];
                    input = selectedBrand.name;
                    selected = selectedBrand.id;
                    showSuggestions = false;
                    highlightedIndex = -1;
                }
                break;
            case 'Escape':
                event.preventDefault();
                showSuggestions = false;
                highlightedIndex = -1;
                break;
        }
    }

    function showDropdown() {
        showSuggestions = true;
        highlightedIndex = -1;
        input = ''
    }

    function hideDropdown() {
        setTimeout(() => { // I use `setTimeout` to prevent the blur event from closing the dropdown before clicking on a suggestion.
            showSuggestions = false;
            highlightedIndex = -1;
            input = props.data.find(b => b.id === selected)?.name || ''; // If user didnt made a choice, display the last selected brand.
        }, 150);
    }

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
        oninput={showDropdown}
        onfocus={showDropdown}
        onblur={hideDropdown}
        onkeydown={handleKeydown}
        placeholder={props.placeholder}
        disabled={props.disabled}
        class="w-full p-2 min-w-[300px] bg-white text-gray-700 border-b-2 border-secondary focus:outline-none focus:border-secondary/80 placeholder:font-light disabled:bg-white/40 disabled:cursor-not-allowed"
    />

    <img src="{dropdown}" alt="Logo dropdown" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />


    {#if showSuggestions && filtered.length > 0}
        <ul 
            bind:this={suggestionsContainer}
            class="absolute z-10 w-full bg-white border border-gray-200 text-black shadow-md max-h-60 overflow-y-auto"
        >
            {#each filtered as item, i (i)}
                <li>
                    <button
                        id="{item.id}"
                        class="w-full text-left px-4 py-2 cursor-pointer hover:bg-primary {i === highlightedIndex ? 'bg-primary' : ''}"
                        aria-label={item.name}
                        onclick={() => {
                            input = item.name;
                            selected = item.id;
                            showSuggestions = false;
                            highlightedIndex = -1;
                        }}
                    >
                        {item.name}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>
