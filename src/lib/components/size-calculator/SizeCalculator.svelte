<script lang="ts">
    import logo from '$lib/images/logo.svg'
    import logoText from '$lib/images/logo-text.svg'
    import type {Brand} from "$lib/types/brand";
    import type {Category} from "$lib/types/category";
    import AutoCompletion from "$lib/components/auto-completion/AutoCompletion.svelte";
    import {fetchCategories, fetchBrands} from "$lib/api/api";
    import {debounce} from "$lib/utils/debounce";

    // Initialize with some default brands to show before user starts typing
    let brands = $state<Brand[]>([
        {
            "id": "gucci",
            "name": "Gucci"
        }
    ])

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

    let categories = $state<Category[]>([])

    let brandIdSelected = $state<string | null>(null)
    let brandNameSelected = $derived<string, null>(brands.find(brand => brand.id === brandIdSelected)?.name ?? null)
    let categoryIdSelected = $state<string | null>(null)

    let isCategoryAutoCompletionDisabled = $derived<boolean>(brandIdSelected === null ||  brandIdSelected === '')

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
                console.error(e)
            }
        }
    })
</script>

<div class="font-manrope max-w-sm p-4 bg-global-gray rounded-2xl shadow border border-[#E7E7E782]">
    <!-- Header -->
    <div class="bg-primary rounded-t-2xl -m-4 mb-4 p-4 flex items-center space-x-2">
        <img src="{logo}" alt="Logo of Size Calculator, it's a big S" />
        <img src="{logoText}" alt="Text Size Calculator" />

    </div>

    <!-- Form -->
    <div class="px-4 py-3 flex flex-col gap-4">
        <AutoCompletion bind:selected={brandIdSelected} data={brands} placeholder="Select a brand" onSearch={updateBrands} />

        <AutoCompletion disabled={isCategoryAutoCompletionDisabled} bind:selected={categoryIdSelected} data={categories} placeholder="Select a category" />

        <div class="flex flex-row gap-2 items-center justify-center ">
            <span>My size is</span>
            <input
                    type="number"
                    class="w-32 h-10 px-2 text-center focus:outline-none focus:ring-2 focus:ring-primary bg-white "
            />
            <span>inches.</span>
        </div>

        <button class="bg-secondary hover:bg-secondary/80 text-gray-800 py-2 px-4 rounded-xl shadow-md shadow-black/25 cursor-pointer mx-auto">
            CALCULATE
        </button>
    </div>
</div>
