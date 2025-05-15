<script lang="ts">
    import type {Brand} from "$lib/types/brand";
    import type {Category} from "$lib/types/category";
    import type {Size} from "$lib/types/size";
    import AutoCompletion from "$lib/components/auto-completion/AutoCompletion.svelte";
    import {fetchCategories, fetchBrands, fetchSizes} from "$lib/api/api";
    import {debounce} from "$lib/utils/debounce";
    import Button from "$lib/components/Button.svelte";

    type Props = {
        sizeReady: (sizes: Size[]) => void
    }

    let { sizeReady }: Props = $props();

    // TODO: Discuss with the Nicolas if we want add some default value or not
    let brands = $state<Brand[]>([])
    let categories = $state<Category[]>([])
    let measurement = $state<number | null>(null)

    let brandIdSelected = $state<string | null>(null)
    let brandNameSelected = $derived<string | null>(brands.find(brand => brand.id === brandIdSelected)?.name ?? null)
    let categoryIdSelected = $state<string | null>(null)

    let isCategoryAutoCompletionDisabled = $derived<boolean>(brandIdSelected === null ||  brandIdSelected === '')
    let isCalculatedButtonDisabled = $derived<boolean>(isCategoryAutoCompletionDisabled || measurement === null || measurement === 0)

    // Fetch categories when the brandIdSelected changes
    $effect(async () => {
        if (brandIdSelected) {
            try {
                categories = await fetchCategories(brandIdSelected)
                if (categories.length === 0) {
                    alert(`Sorry, the size calculator is currently not available for ${brandNameSelected}`)
                    brandIdSelected = null
                }
            } catch (e) {
                console.error('Error fetching categories:', e)
            }
        }
    })

    // Function to fetch brands when user types in the brand input
    async function updateBrandsImpl(searchTerm: string) {
        if (searchTerm.length > 0) {
            try {
                brands = await fetchBrands(searchTerm);
            } catch (e) {
                console.error('Error fetching brands:', e);
            }
        }
    }

    // Debounce function used to avoid useless API calls
    const updateBrands = debounce(updateBrandsImpl, 300);

    async function onSubmitCalculate () {
        try {
            const sizes = await fetchSizes(brandIdSelected, categoryIdSelected, measurement);
            sizeReady(sizes)

            if (sizes.length === 0) {
                alert(`Sorry, the size calculator is currently not available for ${brandNameSelected}`)
            }
        } catch (e) {
            console.error('Error fetching sizes:', e);
        }
    }
</script>

<!-- Form -->
<div class="flex flex-col gap-4">
    <AutoCompletion bind:selected={brandIdSelected} data={brands} placeholder="Select a brand" onSearch={updateBrands} />

    <AutoCompletion disabled={isCategoryAutoCompletionDisabled} bind:selected={categoryIdSelected} data={categories} placeholder="Select a category" />

    <div class="flex flex-row gap-2 items-center justify-center">
        <span>My size is</span>
        <input
                bind:value={measurement}
                type="number"
                class="w-20 h-10 px-2 text-center focus:outline-none focus:ring-2 focus:ring-primary bg-white "
        />
        <span>inches.</span>
    </div>

    <Button
        onclick={onSubmitCalculate}
        disabled={isCalculatedButtonDisabled}
    >
        CALCULATE
    </Button>
</div>
